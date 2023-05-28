import COS from "cos-js-sdk-v5";
const config = {
    Bucket: "bucket-1308250682",
    Region: "ap-nanjing",
    Baseurl: "",
    Key: "",
};
import api from "@/common/api";
// SecretId : AKIDtulSzLUSFWbdWDj5FG8oKSSM9nT2Rjts
export default function upload(file, callback) {
    // let fileUrl = ''
    api.getTmpSecret().then((response) => {
        console.log("getTmpSecret", response);
        // 后台接口返回 密钥相关信息
        const resData = response.data;
        const credentials = resData.credentials;
        config.Bucket = resData.bucket;
        config.Region = resData.region;
        config.Baseurl = resData.baseurl;
        config.Key = resData.key;
        let uploadFileName = Date.parse(new Date());
        var cos = new COS({
            getAuthorization: function (options, callback) {
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    XCosSecurityToken: credentials.sessionToken,
                    StartTime: resData.startTime,
                    ExpiredTime: resData.expiredTime,
                    expiration: resData.expiration,
                    requestId: resData.requestId,
                });
            },
        });
        cos.putObject(
            {
                // 此处用了最简单的上传函数，此外，腾讯云还支持分片上传函数等等。
                Bucket: config.Bucket, // 存储桶名称
                Region: config.Region, // 地区
                Key: config.Key, // 图片名称
                StorageClass: "STANDARD",
                Body: file, // 上传文件对象
                onHashProgress: function (progressData) {
                    console.log("校验中", JSON.stringify(progressData));
                },
                onProgress: function (progressData) {
                    console.log("上传中", JSON.stringify(progressData));
                },
            },

            function (err, data) {
                // 此处的两个传参是腾讯云返回的，data与上面的data不一样。直接照着写就可以。
                // 这里的data如果是个带有Location等的对象，则说明上传成功。
                if (err) {
                    uni.showToast({
                        content: "文件上传失败,请重新上传",
                    });
                    // this.$message.error('文件上传失败,请重新上传')
                } else {
                    let fileUrl = data.Location;
                    callback(fileUrl);
                }
            }
        );
    });
}
