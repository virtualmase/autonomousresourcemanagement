# Builder Governance Lab

This is a local, standards-based browser demonstration of the ARM Builder boundary. It has no backend, storage, external telemetry, deployment command, or GitHub write access.

The demo calculates a lab-only preferred token value from the simulated-inline-width slider so the otherwise viewport-based `clamp()` ranges can be inspected in one page. The portal itself continues to use its original `vw`-based rules. It also runs four scenarios:

| Scenario | Expected behavior |
|---|---|
| Approved update | Replaces allow-listed plain text and applies an allowed semantic type class; writes a local audit event. |
| Block self-review | Stops because the Builder and reviewer are the same. |
| Block property mismatch | Stops because a portal element is requested under flagship authority. |
| Block markup injection | Stops because replacement text includes markup characters. |

To run it from the repository root:

```bash
python3 -m http.server 8091 --directory demos/builder-governance
```

Then open `http://localhost:8091`. The local audit list is intentionally in-memory only. Production telemetry must be emitted by a trusted CI/deployment/monitoring identity and evaluated through the repository’s threshold policy.
