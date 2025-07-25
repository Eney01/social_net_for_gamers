pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: jnlp
    image: user0107/jenkins-agent-dind:latest
    tty: true
    securityContext:
      privileged: true
    volumeMounts:
      - name: docker-graph
        mountPath: /var/lib/docker
  volumes:
    - name: docker-graph
      emptyDir: {}
"""
    }
  }

  environment {
    DOCKER_IMAGE = "user0107/social-net-backend:latest"
  }

  stages {
    stage('Build Docker') {
      steps {
        dir('backend') {
          sh 'docker build -t $DOCKER_IMAGE .'
        }
      }
    }

    stage('Push Docker') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }

    stage('Deploy to K3s') {
      steps {
        sh 'kubectl rollout restart deployment backend'
      }
    }
  }
}
}


