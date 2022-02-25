FROM gitpod/workspace-full

ARG KUBECTL_VERSION=v1.21.2

# isntall kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod +x ./kubectl && \
    sudo mv ./kubectl /usr/local/bin/kubectl && \
    mkdir ~/.kube

# install aws-cli v2
RUN sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  && unzip awscliv2.zip \
  && sudo ./aws/install

# install helm
RUN curl -LO https://get.helm.sh/helm-v3.8.0-linux-amd64.tar.gz && \
    tar -zxvf helm-v3.8.0-linux-amd64.tar.gz && \
    sudo mv linux-amd64/helm /usr/local/bin/helm