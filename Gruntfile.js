module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('config/secret.json'),
        sftp: {
            deploy: {
                files: {
                    "./": ["config/*","providers/*","test-files/*","package.json"]
                },
                options: {
                    createDirectories: true,
                    host: "<%= secret.host%>",
                    username: "<%= secret.username%>",
                    password: "<%= secret.password%>",
                    path: '/home/pi/pirate-box/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ssh');

};