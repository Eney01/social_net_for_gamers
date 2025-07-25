pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: user0107/jenkins-agent-docker:latest
    command:
    - cat
    tty: true
    securityContext:
      privileged: true
"""
      defaultContainer 'docker'
    }
  }

  environment {
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Build Docker') {
      steps {
        sh 'dockerd > /dev/null 2>&1 & sleep 5'
        dir('backend') {
          sh 'docker build -t user0107/social-net-backend:latest .'
        }
      }
    }

    stage('Push Docker') {
      steps {
        sh 'docker push user0107/social-net-backend:latest'
      }
    }

    stage('Deploy to K3s') {
      steps {
        sh 'kubectl rollout restart deployment backend'
      }
    }
  }
}


