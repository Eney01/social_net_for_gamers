pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'user0107'
    BACKEND_IMAGE = "${DOCKER_HUB_USER}/social-net-backend:latest"
    FRONTEND_IMAGE = "${DOCKER_HUB_USER}/social-net-frontend:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main_project', url: 'https://github.com/Eney01/social_net_for_gamers.git'
      }
    }

    stage('Build Docker images') {
      steps {
        script {
          dir('backend') {
            sh "docker build -t $BACKEND_IMAGE ."
          }
          dir('frontend') {
            sh "docker build -t $FRONTEND_IMAGE ."
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $BACKEND_IMAGE
            docker push $FRONTEND_IMAGE
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          kubectl rollout restart deployment backend
          kubectl rollout restart deployment frontend
        '''
      }
    }
  }
}


