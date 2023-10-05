pipeline {
    agent any
    stages {
        stage('stage') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'docker compose build'
                    sh 'docker compose down'
                    sh 'docker compose up -d --wait'
                }
            }
        }
        stage('log') {
            steps {
                sh 'docker compose logs'
            }
        }
        stage('post') {
            steps {
                sh 'docker system prune --all --force'
                jiraSendDeploymentInfo environmentId: 'sg-staging-1', environmentName: 'sg-staging-1', environmentType: 'staging', state: 'successful'
            }
        }
    }
}
