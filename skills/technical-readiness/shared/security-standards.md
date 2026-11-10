# Security Standards

## 1. Purpose

Establish a secure coding baseline and minimum security requirements for BE, FE, and native mobile integration. No MUST in this file may be relaxed for delivery speed.

## 2. Principles

- **Least privilege**: grant only the minimum required access.
- **Deny by default**: deny unless explicitly allowed.
- **Defense in depth**: never rely on a single control.
- **Fail closed**: reject on error or missing information.
- **Zero trust input**: treat all client, API, file, webhook, and log data as untrusted.
- **Frontend is not a security boundary**: authorization **MUST** be enforced by the backend.
- **Secure defaults**: safe defaults; no debug/verbose mode in production.

## 3. Authentication

- **MUST** use the approved authentication mechanism; do not invent a scheme.
- Passwords **MUST** be hashed with an appropriate algorithm (e.g., Argon2/bcrypt) and salt; **MUST NOT** store plaintext or reversibly encrypted passwords.
- Sessions/tokens **MUST** have an expiry, revocation mechanism, and appropriate protection.
- **MUST** prevent brute force/credential stuffing with rate limiting, lockout, or equivalent.
- **MUST** use MFA where business/security requirements mandate it.
- **MUST NOT** put secrets/tokens in URLs, logs, or client bundles.
- **MUST** handle logout, token refresh, and session invalidation correctly.

## 4. Authorization

- **MUST** check authorization on the server for every operation.
- **MUST** enforce object-level authorization (ownership, tenant, organization), not only roles.
- **MUST** prevent IDOR: never trust a client-provided ID without an access check.
- **MUST** apply deny-by-default for new endpoints.
- **MUST** model permissions explicitly; do not scatter hardcoded roles.
- **MUST NOT** let the client decide authorization by hiding or showing UI.

## 5. Input Validation and Output Encoding

- **MUST** validate at the boundary: type, length, format, range, enum, required.
- **MUST** prefer allowlists over blocklists where possible.
- **MUST** use parameterized queries or a safe ORM; **MUST NOT** concatenate SQL.
- **MUST** encode output by context to prevent XSS.
- **MUST** protect cookie-based sessions against CSRF where applicable.
- **MUST** prevent SSRF: do not let clients control arbitrary internal URLs.
- **MUST** deserialize untrusted data safely.

## 6. Sensitive Data

- **MUST** classify data: public, internal, confidential, restricted.
- **MUST** encrypt sensitive data in transit (TLS) and at rest where required.
- **MUST** minimize data collection and retention.
- **MUST NOT** log passwords, tokens, secrets, full card numbers, full identifiers, or unnecessary PII.
- **MUST** mask sensitive data in logs, errors, and unnecessary UI.
- **MUST** define deletion/archival processes according to business/legal requirements.

## 7. Secrets Management

- **MUST** store secrets in a secret manager or protected environment variables.
- **MUST NOT** commit secrets, keys, private certificates, or secret-bearing `.env` files.
- **MUST** rotate a secret when exposed or per policy.
- **MUST** run secret scanning in CI where available.
- **MUST NOT** put secrets in logs, errors, test fixtures, or public docs.

## 8. API Security

- **MUST** use HTTPS/TLS for all external communication.
- **MUST** rate-limit sensitive or abuse-prone endpoints.
- **MUST** configure CORS with an allowlist; do not use `*` for credentialed endpoints.
- **MUST** set appropriate security headers (HSTS, CSP, X-Content-Type-Options, etc., as applicable).
- **MUST** return safe errors without stack traces, SQL, internal paths, or infrastructure versions.
- **MUST** validate content type and request size.
- **MUST** support idempotency for sensitive retryable operations.

## 9. File Upload/Download

- **MUST** limit size, count, and content type.
- **MUST** validate the actual file, not only the extension or MIME header.
- **MUST** store files outside the web root or in object storage with appropriate permissions.
- **MUST** enforce object-level authorization for file access.
- **MUST** scan for malware when required by security policy.
- **MUST NOT** allow path traversal or guessable private URLs.

## 10. Audit and Monitoring

- **MUST** audit critical actions: login, permission changes, sensitive data changes, exports, deletions.
- Audit records **MUST** include actor, action, object, timestamp, result, and correlation ID.
- **MUST** alert on important anomalous events where supported.
- **MUST NOT** allow ordinary users to modify or delete audit logs.

## 11. Dependencies and Supply Chain

- **MUST** use dependencies from trusted sources with compatible licenses.
- **MUST** check for vulnerabilities periodically or in CI.
- **MUST** have a process for handling critical vulnerabilities.
- **MUST NOT** add unknown or unnecessary dependencies.

## 12. Workstream-Specific Requirements

### 12.1. Backend

- Enforce authorization on every endpoint and object.
- Validate all input, including internal calls.
- Do not return internal models or exceptions.
- Enforce tenant isolation.
- Audit critical actions.
- Rate-limit sensitive endpoints.

### 12.2. Web frontend

- Do not treat hidden UI as security.
- Encode output; avoid unsafe HTML injection unless sanitized.
- Do not store long-lived tokens where XSS can reach them.
- Do not put secrets in the bundle.
- Validate redirect URLs, postMessage origins, and third-party scripts.

### 12.3. Native mobile integration

- Store tokens/secrets in platform secure storage.
- Do not log sensitive data.
- Consider certificate pinning when required by security policy.
- Validate deep link/universal link input.
- Do not trust data from WebViews.
- Respect platform permission and privacy requirements.

## 13. Verification Checklist

- [ ] Authentication and sessions are protected.
- [ ] Authorization is enforced on the server and at object level.
- [ ] Input is validated; output is encoded.
- [ ] No SQL injection, XSS, CSRF, SSRF, or IDOR.
- [ ] Secrets are not in code, logs, or the repository.
- [ ] Sensitive data is protected and not over-logged.
- [ ] File upload/download is controlled.
- [ ] Rate limiting and security headers are applied where relevant.
- [ ] Audit trails exist for critical actions.
- [ ] Dependency vulnerabilities are checked.
- [ ] Error responses do not expose internals.
- [ ] Mobile secure storage and deep links are considered.
