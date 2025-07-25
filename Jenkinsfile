pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: jnlp
    image: user0107/jenkins-agent-docker:latest
    args:
    - \$(JENKINS_SECRET)
    - \$(JENKINS_NAME)
"""
    }
  }

  stages {
    stage('Build Docker') {
      steps {
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


