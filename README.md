[Uploading README.md…]()
# Visual Working Memory Experiments — GitHub Release Package

本目录按实验版本拆分为相互独立的静态发布目录。每个子目录都包含自己的 `index.html`、实验页面、实验脚本、`style.css`、本地 Excel 导出库、`VERSION` 和 `src/storage`。

## 可发布版本

- `cdt_fullprobe/`：CDT 原版，全探测
- `cdt_circle/`：CDT circle，圆周位置与虚拟鼠标
- `cdt_compare/`：CDT compare
- `cdt_traditional/`：CDT traditional
- `clt/`：CLT 原版
- `clt_circle/`：CLT circle
- `clt_compare/`：CLT compare
- `clt_traditional/`：CLT traditional
- `clt_traditional_123890/`：CLT traditional 数字键版本

## 部署方式

每个子目录均可单独作为 GitHub Pages 的静态站点目录，入口统一为 `index.html`。不要把当前工作区根目录的历史 xlsx、zip、`.workbuddy`、备份或真实被试数据上传到 GitHub。

## Supabase 配置

当前发布包中的 Supabase URL 和 publishable/anon key 仍是占位符。上线前只替换为可公开使用的 publishable/anon key；严禁把 `service_role`、secret key 或数据库密码放入 HTML/JavaScript。

Supabase 表和 RLS 策略应在上线前单独配置。实验页面不应向被试展示其他被试数据。

## 被试信息

GitHub Pages 前端无法隐藏浏览器中的输入字段或网络请求。建议实验页面只接收匿名被试码；联系方式和报酬信息由 Credamo 侧管理，或在与实验数据分离的表中管理。不要把身份证号和完整手机号写入实验 trial 表。
