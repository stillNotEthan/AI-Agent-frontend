pipeline {
    agent any

    environment {
        // 如果 Node.js 安装在非标准 PATH，可以在这里加路径，例如：
        PATH = "/opt/homebrew/bin:${env.PATH}"
        VERCEL_TOKEN = credentials('vercel-token')
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Vercel CLI') {
            steps {
                sh '''
                    npm install -g vercel
                    vercel --version
                '''
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
                sh '''
                    vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
                    vercel build --token=$VERCEL_TOKEN
                    vercel deploy --prebuilt --token=$VERCEL_TOKEN
                '''
            }
        }
    }
}
