# Deployment
These configuration files help deploying the application to a Kubernetes cluster.

## Requirements
* Kuberentes 1.21 cluster
* Node group configured for the cluster
* [kubectl](https://kubernetes.io/docs/tasks/tools/) setup with context and authentication for the kubernetes cluster
* Load balancer controller configured ([AWS](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.3/), [GCP](https://github.com/kubernetes/ingress-gce))
* [Istio](https://istio.io/latest/docs/setup/install/istioctl/) setup and configured

## Configuration
1. Ensure `.env` is setup with all values
2. Apply the `frontend-backend.yaml` config to kubernetes and substitue the environment variables.
3. Create X.509 RSA-4096 PEM encoded cert for TLS and save it as a secret in the `istio-system` namespace with the name `tls-secret` \
Here is an example script to generate and create the secret\
```
mkdir certs

openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout certs/key.pem -out certs/cert.pem -subj "/CN=$(echo $EA_HOST)" \
  -addext "subjectAltName=DNS:$(echo $EA_HOST)"

kubectl create -n istio-system secret generic tls-secret \
--from-file=key=certs/key.pem \
--from-file=cert=certs/cert.pem
```
3. Apply the `istio-gateway.yaml`, `istio-services.yaml`, and `istio-entry.yaml` configs to kubernetes and substitue the environment variables.
4. Configure an ingress for istios. An example ingress is given in `example-aws-alb-ingress.yaml`. Be sure to replace the cert arn for a valid arn registered to the EA_HOST environment variable and substitue the environment variables. Ensure your load balancer controller is configured correctly for your cloud provider.
5. Get the IP address for the new ingress and setup an A record for EA_HOST pointint to this IP address\
You can get the ip address with `echo $(kubectl get ingress gw-ingress -n istio-system \
-o jsonpath="{.status.loadBalancer.ingress[*].hostname}")` 