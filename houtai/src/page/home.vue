<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">日程发布</header>
            <el-form name="upload" id="upload">
                <el-upload
                    class="upload-demo" name="officeName"
                    ref="upload"
                    multiple="false"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="submitUpload"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :auto-upload="false"
                    :multiple="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form>
            <el-row class="release">
                <el-button type="success">发布</el-button>
            </el-row>
		</section>

    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    import {baseUrl} from '../config/env'

    export default {
    	data(){
            return{
                baseUrl,
            }
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleChange(file, fileList){
                console.log(file);
                console.log(fileList);
            },
            beforeUpload: function (file) {
                console.log(baseUrl)
                //这里是重点，将文件转化为formdata数据上传
                let data = new FormData();
                // var word = file;
                data.append('office',file);
                //data.append('type','source_material')
                //data.append('org_id_init',"5B6CE3C39135D03D84CAFE223D352D77");
                var apiPath = "http://111.230.176.108:3333/api/publish"
                //var apiPath = "http://192.168.11.162:8090/api/v1/due_diligence/upload_file/"
                this.axios.post(apiPath,data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(res) {
                        console.log(res)
                        let data = eval+"("+res.data+")";
                        console.log(typeof(data))
                        if(data.code==1){
                            console.log(data.data.filename)
                        }
                }).then(function (data) {
                    console.log(data)
                })
            }
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';

	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
        .release{
            margin-top: 500px;
            text-align: center;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
