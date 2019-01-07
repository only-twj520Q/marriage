const express = require('express');
const model = require('../model');
const utils = require('utility');
const result = require('../common/result');

const Router = express.Router();
const _filter = {
	pwd: 0,
	__v: 0
};
const User = model.getModel('user');

// 用户登陆接口
Router.post('/login', function(req, res){
	const { user, pwd } = req.body;

  User.findOne({
    user,
    pwd: md5Pwd(pwd)
  }, _filter, function(err, doc) {
    if (err) {
			return res.json(result.fail(-1))
    }
    if (!doc) {
			return res.json(result.errorParam(-10, '用户名或密码错误'))
    }

		// 登陆成功写入cookie
		res.cookie('userid', doc._id);

		return res.json(
			result.succ(0, '登陆成功', {
				...doc._doc,
        path: doc.avatar ? `/${doc.sex}list` : `/moreinfo`
			})
		)

  })
})

// 用户注册接口
Router.post('/register', function(req, res) {
  const { user, pwd, sex } = req.body;

  User.findOne({ user }, function(err, doc) {
    if (doc) {
			return res.json(result.errorParam(-10, '用户名重复'));
    }

    // 插入数据
    const userModel = new User({ user, sex, pwd: md5Pwd(pwd) });
    userModel.save(function(err, doc) {
      if (err) {
				return res.json(result.fail(-20, '数据库插入错误'))
      }

			res.cookie('userid', doc._id);

			return res.json(
				result.succ(0, '注册成功', {
					user,
          sex,
          path: `/moreinfo`
				})
			)
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

// info接口
Router.get('/info', function(req ,res) {
	const { userid } = req.cookies;

	// 如果没有userid
	if (!userid) {
		return res.json(result.errorParam());
	}

	User.findOne({ _id: userid } ,_filter, function(err, doc) {
		if (err) {
			return res.json(result.fail());
		}

		return res.json(result.succ(0, '请求成功', doc))

	})
})

// 完善信息
Router.post('/update', function(req, res) {
	const { userid } = req.cookies;
	if (!userid) {
		return res.json(result.errorParam());
	}

	const body = req.body;

	User.findOneAndUpdate(userid , body, function(err, doc) {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.sex
		}, body);

		return res.json(result.succ(0, '请求成功', {
			...data,
			path: doc.sex === 'man' ? '/womenlist' : '/manlist'
		}))
	})
})

function md5Pwd(pwd) {
	const salt = 'marriage_web_touch!@#Love_forever';
	return utils.md5(`${pwd}${salt}`);
}

module.exports = Router;
