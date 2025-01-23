# Istio Rate Limiting Examples

This repository demonstrates two approaches to implementing rate limiting in Istio: Local Rate Limiting and Global Rate Limiting. These examples showcase how to manage traffic flow and protect services from excessive requests using Istio's Envoy filters.

## Overview

Rate limiting in Istio helps control the number of requests sent to a service to prevent overloading and ensure fair usage. The two approaches covered in this repository are:
- **Local Rate Limiting**: Enforces rate limits at the sidecar proxy level, where each instance of a service independently applies the configured limits.
- **Global Rate Limiting**: Enforces rate limits across all instances on a Gateway level of a service using a centralized Redis-based rate-limiting mechanism.

## Deploy

This configuration can be deployed as is with [FluxCD example](https://github.com/brainfair/awesome-flux-head/blob/main/clusters/homelab/02-istio-ratelimits.yaml) or just with kubectl (make sure that you replaced subdomain placeholders before).

## Run Tests
Tests are provided using the k6 framework in the ```test.js``` files located inside each example directory. The tests target the configured rate-limited path (```/headers```) and validate the ```custom-header``` value.

You can run the tests using the Makefile commands inside each directory example:
```
## Common tests with rate limiter per path and header value
make test111  # Runs the test with custom-header set to 111
make test222  # Runs the test with custom-header set to 222

## Global rate limit test per cookie rate limiter
make test-cookie
```
