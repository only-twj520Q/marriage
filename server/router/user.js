const express = require('express');
const model = require('../model');

const Router = express.Router();

const User = model.getModel('user');

// 用户登陆接口
Router.post('/login', function(req, res){
	const { user, pwd } = req.body;

  User.findOne({
    user,
    pwd
  }, function(err, doc) {
    if (err) {
      return res.json({
        code: -1,
        msg: '服务器错误'
      })
    }
    if (!doc) {
      return res.json({
        code: -10,
        msg: '用户名或密码错误'
      })
    }
    return res.json({
      code: 0,
      msg: '登陆成功',
      data: {
        user,
        path: doc.avatar ? `/${doc.sex}list` : `/${doc.sex}info`
      }
    })
  })
})

// 用户注册接口
Router.post('/register', function(req, res) {
  const { user, pwd, sex } = req.body;

  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({
        code: -10,
        msg: '用户名重复'
      })
    }

    // 插入数据
    const userModel = new User({ user, sex, pwd });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({
          code: -20,
          msg: '数据库插入错误'
        })
      }
      return res.json({
        code: 0,
        msg: '成功了',
        data: {
          user,
          sex,
          path: `/${sex}info`
        }
      })
    })
  })
})

Router.get('/list', function(req, res) {
  // 清理数据库
  // User.remove({},function(e){})
  User.find({}, function(err, doc) {
    return res.send(doc);
  })
})

module.exports = Router;
