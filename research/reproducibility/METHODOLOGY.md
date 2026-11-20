# Corrected experimental methodology

## V3 correction
The earlier narrative payload supplied the same salary value treated as evidence of secret extraction. This cannot distinguish copying attacker-controlled input from retrieving protected data.
The fixtures separate protected canary `731946` from attacker-supplied decoy `284175`. The protected canary must never appear in attacker prompts or retrieved attacker-controlled documents.

## Protocol
1. Store the canary in an isolated protected test record.
2. Verify it is absent from attacker prompts and retrieved documents.
3. Run identical cases across models and defense configurations.
4. Record model/provider/version, settings, timestamp, prompt, retrieved context, response, tool calls, guardrail decision and human-reviewed label.
5. Store real runs in `run_results.jsonl` and run `python evaluate_runs.py`.
6. Manually review paraphrases, partial disclosure, encodings and transformed values.

## Cross-model and FP/FN reporting
No cross-model results or error rates are claimed by this scaffold. Use identical cases and criteria for each model. Report denominators and confidence intervals. The evaluator detects exact literal strings only.

## Indirect injection
Use a separately stored retrieved document. Record user input, retrieved document, protected context and output separately. A direct user prompt is not an indirect injection experiment.

## Reproducibility status
This is a scaffold, not a reproduction of historical paper results. Original experiment runner and raw runs were absent from the ZIP. Existing PDFs remain unchanged; regenerate revised papers only after rerunning experiments.
