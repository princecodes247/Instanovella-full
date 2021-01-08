//dbPassword = process.env.MONGODB_URI || 'mongodb://127.0.0.1/instanovella';
dbPassword = "mongodb+srv://princecodes:princecodesatadmin@cluster0.cljyz.mongodb.net/instanovella-db?retryWrites=true&w=majority";

module.exports = {
    mongoURI: dbPassword
};

//+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true'

