# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported |
| ------- | --------- |
| main    | ✅         |

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it **responsibly**.

**Do not** open a public issue for security-sensitive topics.

### How to report

1. **Email:** [adrianmorillasperez@gmail.com](mailto:adrianmorillasperez@gmail.com)  
   Use a descriptive subject, for example: `[Security] actividad_35 – short description`.
2. **Include:**
   - Description of the vulnerability
   - Steps to reproduce (if possible)
   - Impact and suggested fix (optional)

### What to expect

- We will acknowledge receipt as soon as possible.
- We will work on a fix and keep you updated.
- Once fixed, we may publish a security advisory (crediting you if you wish).

---

## Do Not Commit Secrets

- Never commit `.env` files or any file containing real secrets.
- Avoid committing API keys, passwords, access tokens, or private keys.

---

## Dependency Hygiene

- Keep runtime dependencies and third-party assets up to date and review security advisories where applicable.
- Prefer self-hosting critical runtime dependencies for maximum supply-chain control.

