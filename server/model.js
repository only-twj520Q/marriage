const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017';
mongoose.connect(DB_URL);

mongoose.connection.on('connected', function(err) {
  console.log('mongo connect sucess');
})

const models = {
  user: {
    'user': {
      'type': String,
      'require': true
    },
    'pwd': {
      'type': String,
      'require': true
    },
    'sex':{
      'type': String,
      'require': true
    },
    //头像
		'avatar':{
      'type': String
    }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
}
