node {
    stage('Checkout') {
         git 'https://github.com/ChickyD/spring-boot-sample'
    }

    stage('Build') {
        bat 'mvn -e clean install'
    }

    stage('Archive') {
        junit allowEmptyResults: true, testResults: '**/target/**/TEST*.xml'
    }

   stage("Staging") {
                   bat "pid=\$(lsof -i:8090 -t); kill -TERM \$pid " + "|| kill -KILL \$pid"
                   withEnv(['JENKINS_NODE_COOKIE=dontkill']) {
                       bat 'mvn spring-boot:run'
                   }

    stage ("test") {
            env.K6CLOUD_TOKEN="0e2bcf09026d2179120ca6768b0359e0e9347a4ceeec93734d6540ca105cfd45"
            if (isUnix()) {
                sh "k6 run --quiet -o cloud github.com/ChickyD/spring-boot-sample/blob/master/main.js"
            } else {
                bat 'k6.exe run --quiet -o cloud github.com/ChickyD/spring-boot-sample/blob/master/main.js'
            }
        }

        stage ("Done") {
        }

}