pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy stage placeholder'
                // Add deployment steps here
                // sh '''
                //     vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
                //     vercel build --token=$VERCEL_TOKEN
                //     vercel deploy --prebuilt --token=$VERCEL_TOKEN
                // '''
            }
        }
    }
}
