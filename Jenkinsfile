node {
 stage('Checkout') {
  git 'https://github.com/ChickyD/spring-boot-sample'
 }

 stage("Staging") {
   // replace it with your application name or make it easily loaded from pom.xml
   def jarName = "spring-boot-sample.jar"
   echo "the application is deploying ${jarName}"
   // NOTE : CREATE your deployemnt JOB, where it can take parameters whoch is the jar name to fetch from jenkins workspace
   build job: 'spring-boot-sample', wait: false
   echo 'the application is being deployed ....'
   sleep time: 100, unit: 'SECONDS'
}

 stage("test") {
  env.K6CLOUD_TOKEN = "0e2bcf09026d2179120ca6768b0359e0e9347a4ceeec93734d6540ca105cfd45"
   bat 'k6.exe run --quiet -o cloud github.com/ChickyD/spring-boot-sample/main.js'
 }

 stage("Done") {

 }

}