# Copyright (c) 2026 Abhinandan Pandey. All Rights Reserved.
# Deterministic OPA policy enforcing RL environment sandboxing & anti-reward-hacking invariants.

package portfolio.rl.environment

import rego.v1

default allow := false

allowed_actions := {
    "observe_dom",
    "read_state",
    "submit_eval",
}

protected_state_fields := {
    "reward_weight",
    "episode_done",
    "step_count",
    "policy_override",
}

max_steps_per_episode := 20
max_repeated_actions := 3

valid_action if {
    input.action in allowed_actions
}

within_step_budget if {
    input.step_count <= max_steps_per_episode
}

no_action_loop if {
    input.consecutive_repeats <= max_repeated_actions
}

no_reward_tampering if {
    count({f | some f in input.mutated_fields; f in protected_state_fields}) == 0
}

allow if {
    valid_action
    within_step_budget
    no_action_loop
    no_reward_tampering
}

deny_reason contains "unauthorized_action" if {
    not valid_action
}

deny_reason contains "step_budget_exceeded" if {
    not within_step_budget
}

deny_reason contains "action_loop_detected" if {
    not no_action_loop
}

deny_reason contains "reward_tampering_detected" if {
    not no_reward_tampering
}
