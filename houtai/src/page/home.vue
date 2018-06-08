<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
            <header class="section_title">日程发布</header>
			<div class="calendar_div">
                <span>日程名称:</span>
                <el-input class="calendar"  v-model="calendarName" placeholder="请输入日程"></el-input>
            </div>
            <el-form name="upload" id="upload">
                <el-upload
                    class="upload-demo"
                    name="officeName"
                    ref="upload"
                    multiple="false"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="submitUpload"
                    :before-upload="beforeUpload"
                    :auto-upload="false"
                    :multiple="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form>
            <el-row class="release">
                <el-button type="success" @click="publish">发布</el-button>
            </el-row>
		</section>

    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    import {baseUrl} from '../config/env'
    import { Message } from 'element-ui';

    export default {
    	data(){
            return{
                baseUrl,
                calendarName:'',
                officeName:''
            }
    	},
    	components: {
    		headTop,
    	},
    	mounted(){

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
                //这里是重点，将文件转化为formdata数据上传
                let data = new FormData();
                data.append('office',file);
                var apiPath = baseUrl+"/publish/uploadOffice";
                let that = this;
                this.axios.post(apiPath,data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(res) {
                        let data = res.data;
                        if(data.code==1){
                            that.$message(data.msg);
                            that.officeName = data.data.officeName;
                        }
                        else{
                            that.$message(data.msg);
                        }
                });
            },
            publish : function(){
                var url = "http://localhost:3000/add"
                this.axios.post(url,{
                        _id:"JR00000010",
                        value:"1.9"

                }).then(function(res) {
                        console.log(res)
                    });
                // if(this.calendarName.trim()==''){
                //     this.$message('请先上传文件');
                //     return;
                // }
                // var apiPath = baseUrl+"/publish";
                // let that = this;
                // let data = new URLSearchParams();
                // data.append('calendarName',this.calendarName);
                // data.append('officeName',this.officeName);
                // this.axios.post(apiPath,data).then(function(res) {
                //     let data = res.data;
                //     console.log(data);
                //     if(data.code==1){
                //         that.$message(data.msg);
                //     }
                //     else{
                //         that.$message(data.msg);
                //     }
                // });
            }
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';

	.data_section{
		padding: 20px 20px 0 20px;
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
            margin-top: 380px;
            text-align: center;
        }
	}
    .wan{
        .sc(16px, #333)
    }
    .calendar_div{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 0 10px 0;
    }
    .calendar_div>span{
        width: 100px;
    }
    .calendar{
        width: e("calc(50% - 100px)");
    }
</style>
