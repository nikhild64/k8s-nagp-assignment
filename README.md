# Kubernetes Assignment: Node.js API with MySQL Database

## Overview

This project demonstrates how we can deploy a Node.js API service with a MySQL database using Kubernetes. It includes:

- **Database:** A MySQL database deployed as a StatefulSet with persistent storage.
- **API Service:** A Node.js API service deployed as a Deployment with 3 replicas.
- **Horizontal Pod Autoscaling (HPA):** Configured to automatically scale the API service based on CPU utilization when it exceeds 50% it can scale upto 10 pods.

## Code Repository

- **Link:** [https://github.com/nikhild64/k8s-nagp-assignment](https://github.com/nikhild64/k8s-nagp-assignment)

## Docker Images

- **Docker Hub URL:** [https://hub.docker.com/r/nikhildhawan/my-api-image](https://hub.docker.com/r/nikhildhawan/my-api-image)

## Service API Tier

- **URL:** http://localhost:30008/books (will be different when deployed on cloud)

## Screen Recording Video

- **Link:** [One drive Link](https://nagarro-my.sharepoint.com/:v:/p/nikhil_dhawan/ETeyIDqFrRBJva-4E4CxcC8B3mjg0NzWG75ivgOfeUhG7A)

## Instructions

1. **Prerequisites:**

   - **Docker Desktop:** Make sure you have Docker Desktop installed and Kubernetes enabled.
   - **kubectl:** Ensure that the `kubectl` command-line tool is installed and configured to interact with your cluster.

2. **Deployment:**

   - **Clone the repository:** Clone the repository from the link provided above.
   - **Apply manifests:** From root we can execute below commands to add the yaml files

   ````bash
    kubectl apply -f database
   kubectl apply -f api/api-configmap.yaml,api/api-deployment.yaml,api/api-secret.yaml,api/api-service.yaml,api/components.yaml,api/hpa.yaml
    ```

   ````

   To check running Database pods we can use

   ```
   kubectl get pods -l app=mysql
   ```

   To check running API pods we can use

   ```
   kubectl get pods -l app=api
   ```

   To check running PVC pods we can use

   ```
   kubectl get pvc
   ```

3. **Testing:**

- **Verify Data persistence:** To test data persistence we can first delete the sql pod and wait for it to re run and then verify using API if data is persisted using postman.

To delete pod we can execute:

```
kubectl delete pod mysql-0
```

- **Load Test:** To test the horizontal pod autoscaler, we will have to increase load on API server. For that we can use Postman and inside that there is runner feature that can be used here to make multiple requests
- **Verify Scaling:** To monitor the scaling of your API pods we can use

```
kubectl get hpa api-hpa -w
```

- **Rolling update Test:** To apply different version of API image we can use the below command and check the pods getting created and old getting removed

```
kubectl set image deployment/api-deployment api=nikhildhawan/my-api-image:v2
```

4. **To view the records from the MySQL database(using POSTMAN or similar tools):**

- Open the url in your browser or make a GET request to `http://localhost:30008/books`

5. **To add new books to the MySQL database(using POSTMAN or similar tools):**

- Make a POST request to `http://localhost:30008/books`

6. **To stop running resources we can use**

```
kubectl delete all --all
```
