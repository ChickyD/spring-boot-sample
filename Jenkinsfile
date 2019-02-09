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
 timeout(time: 3, unit: 'MINUTES') {
   // replace it with your application name or make it easily loaded from pom.xml
   def jarName = "spring-boot-sample.jar"
   echo "the application is deploying ${jarName}"
   // NOTE : CREATE your deployemnt JOB, where it can take parameters whoch is the jar name to fetch from jenkins workspace
   build job: 'spring-boot-sample', parameters: [
    [$class: 'StringParameterValue', name: 'jarName', value: jarName]
   ]
   echo 'the application is deployed !'
}
 }

 stage("test") {
  env.K6CLOUD_TOKEN = "0e2bcf09026d2179120ca6768b0359e0e9347a4ceeec93734d6540ca105cfd45"
  if (isUnix()) {
   sh "k6 run --quiet -o cloud github.com/ChickyD/spring-boot-sample/blob/master/main.js"
  } else {
   bat 'k6.exe run --quiet -o cloud github.com/ChickyD/spring-boot-sample/blob/master/main.js'
  }
 }

 stage("Done") {}

}