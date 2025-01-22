# Istio Rate Limiting Examples

This repository demonstrates two approaches to implementing rate limiting in Istio: Local Rate Limiting and Global Rate Limiting. These examples showcase how to manage traffic flow and protect services from excessive requests using Istio's Envoy filters.

## Overview

Rate limiting in Istio helps control the number of requests sent to a service to prevent overloading and ensure fair usage. The two approaches covered in this repository are:
- Local Rate Limiting: Enforces rate limits at the sidecar proxy level, where each instance of a service independently applies the configured limits.
- Global Rate Limiting: Enforces rate limits across all instances on a Gateway level of a service using a centralized Redis-based rate-limiting mechanism.
