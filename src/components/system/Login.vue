<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">Hobby后台管理系统</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<el-button slot="prepend" icon="el-icon-lx-people">账号</el-button>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
						<el-button slot="prepend" icon="el-icon-lx-lock">密码</el-button>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm()">登录</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				param: {
					username: 'yang',
					password: '12345',
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
			};
		},
		methods: {
			submitForm() {
				this.$refs.login.validate(valid => {
					if (valid) {
						const data = new FormData();
						data.append("username", this.param.username)
						data.append("password", this.param.password)
						axios.post('/login', data).then(res => {
							if (res.data.code == 200) {
								localStorage.setItem('ms_username', this.param.username)
								localStorage.setItem('Authorization', res.headers.token)
								this.$message.success('登录成功');
								this.$router.push('/home');
							} else {
								this.$message.error("登录失败")
							}
						}).catch(res => {
							this.$message.error("登录失败")
						})
					} else {
						this.$message.error('请输入账号和密码');
						return false;
					}
				});
			},
		},
	};
</script>

<style scoped>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../../assets/img/login-bg.jpg);
		background-size: 100%;
	}

	.ms-title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: black;
	}

	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 350px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.5);
		overflow: hidden;
	}

	.ms-content {
		padding: 30px 30px;
	}

	.login-btn {
		text-align: center;
	}

	.login-btn button {
		width: 100%;
		height: 36px;
		margin-bottom: 10px;
	}

	.login-tips {
		font-size: 12px;
		line-height: 30px;
		color: #fff;
	}
</style>
