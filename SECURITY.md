# Security policy

ShipLab is an educational **single-user demo** intended for localhost and isolated agent sandboxes. It intentionally does **not** implement authentication, authorization, tenant isolation, rate limiting, or production database security. Its write APIs must not be publicly exposed.

- Do not submit real customer data, passwords, API keys, or private organization information.
- Keep \`.env\`, local databases, agent access tokens, GitHub App secrets, and screenshots of sensitive settings out of Git.
- Install third-party GitHub integrations with access limited to this repository.
- Open a private security report via the maintainer's GitHub profile, rather than sharing live credentials in a public issue.

There is no production deployment supported by this starter.
