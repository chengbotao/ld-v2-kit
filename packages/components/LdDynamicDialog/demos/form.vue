<script>
import { useDialog } from "../index";

export default {
  methods: {
    openFormDialog() {
      // 定义表单组件，使用 render 函数
      const FormComponent = {
        props: ["initialForm"],
        data() {
          return {
            form: this.initialForm || { name: "", age: 0, email: "" },
            rules: {
              name: [
                { required: true, message: "请输入姓名", trigger: "blur" },
              ],
              age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
              email: [
                { required: true, message: "请输入邮箱", trigger: "blur" },
                {
                  type: "email",
                  message: "请输入正确的邮箱格式",
                  trigger: "blur",
                },
              ],
            },
          };
        },
        methods: {
          handleSubmit() {
            this.$refs.formRef.validate((valid) => {
              if (valid) {
                this.$emit("close", "submit", this.form);
              }
            });
          },
          handleCancel() {
            this.$emit("close", "cancel");
          },
        },
        render(h) {
          return h("div", {
            style: {
              padding: "20px",
            },
          }, [
            h("h3", "表单对话框示例"),
            h("el-form", {
              ref: "formRef",
              props: {
                model: this.form,
                rules: this.rules,
                labelWidth: "80px",
              },
            }, [
              h("el-form-item", {
                props: {
                  label: "姓名",
                  prop: "name",
                },
              }, [
                h("el-input", {
                  props: {
                    value: this.form.name,
                  },
                  on: {
                    input: (value) => {
                      this.form.name = value;
                    },
                  },
                }),
              ]),
              h("el-form-item", {
                props: {
                  label: "年龄",
                  prop: "age",
                },
              }, [
                h("el-input-number", {
                  props: {
                    value: this.form.age,
                    min: 0,
                    max: 100,
                  },
                  on: {
                    change: (value) => {
                      this.form.age = value;
                    },
                  },
                }),
              ]),
              h("el-form-item", {
                props: {
                  label: "邮箱",
                  prop: "email",
                },
              }, [
                h("el-input", {
                  props: {
                    value: this.form.email,
                    type: "email",
                  },
                  on: {
                    input: (value) => {
                      this.form.email = value;
                    },
                  },
                }),
              ]),
              h("el-form-item", {}, [
                h("el-button", {
                  props: {
                    type: "primary",
                  },
                  on: {
                    click: this.handleSubmit,
                  },
                }, "提交"),
                h("el-button", {
                  on: {
                    click: this.handleCancel,
                  },
                }, "取消"),
              ]),
            ]),
          ]);
        },
      };

      // 打开对话框
      useDialog({
        componentInstance: FormComponent,
        componentProps: {
          initialForm: {
            name: "张三",
            age: 18,
            email: "zhangsan@example.com",
          },
        },
        dialogProps: {
          title: "表单对话框",
          width: "500px",
          top: "10vh",
        },
        close: (type, componentRef, done) => {
          if (type === "submit") {
            console.log("表单提交:", componentRef.form);
            // 可以在这里处理表单数据
            alert(
              "表单提交成功！\n" + JSON.stringify(componentRef.form, null, 2),
            );
          }
          done();
        },
      });
    },
  },
};
</script>
<template>
  <el-button type="primary" @click="openFormDialog">打开表单对话框</el-button>
</template>
