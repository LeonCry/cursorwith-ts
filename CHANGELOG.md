## 1.0.0 (2025-10-25)

* fix: :bug: 镂空内部,去除多余绘制 ([9729c5a](https://github.com/LeonCry/cursor-with/commit/9729c5a))
* fix: :bug: 修复部分类型问题 ([129d2c4](https://github.com/LeonCry/cursor-with/commit/129d2c4))
* fix(core): 消除帧率差异 ([daa2406](https://github.com/LeonCry/cursor-with/commit/daa2406))
* fix(core): 修复listenerUnWrapper未找到tag时抛出错误的问题 ([a8398f2](https://github.com/LeonCry/cursor-with/commit/a8398f2))
* fix(cursor-with): 修复容器大小变化时未更新画布的问题 ([ddc890e](https://github.com/LeonCry/cursor-with/commit/ddc890e))
* fix(cursor): 修复反色逻辑并重构颜色处理逻辑 ([c8bdf3a](https://github.com/LeonCry/cursor-with/commit/c8bdf3a))
* fix(cursor): 修复光标重置时未及时重绘圆闪烁问题 ([7e2f51a](https://github.com/LeonCry/cursor-with/commit/7e2f51a))
* fix(docs): 修正文档中导入路径错误并优化构建配置 ([893295c](https://github.com/LeonCry/cursor-with/commit/893295c))
* fix(docs): 修正cursorwith-ts模块的路径别名配置 ([7560367](https://github.com/LeonCry/cursor-with/commit/7560367))
* docs: 更新文档内容与结构，添加API指南与插件说明 ([22907c1](https://github.com/LeonCry/cursor-with/commit/22907c1))
* docs: 重构文档结构并更新API内容 ([7b62f4a](https://github.com/LeonCry/cursor-with/commit/7b62f4a))
* feat: 新增插件文档与示例组件 ([7e1a941](https://github.com/LeonCry/cursor-with/commit/7e1a941))
* feat(click-effect): 支持自定义点击动画持续时间 ([b503cc3](https://github.com/LeonCry/cursor-with/commit/b503cc3))
* feat(core-deform): :sparkles: 新增变形功能 ([4dbc589](https://github.com/LeonCry/cursor-with/commit/4dbc589))
* feat(core-hovereffect): :sparkles: hoverEffect逻辑建立 ([17b8a7c](https://github.com/LeonCry/cursor-with/commit/17b8a7c))
* feat(core-tail): :sparkles: 绘制拖尾效果逻辑 ([696d76b](https://github.com/LeonCry/cursor-with/commit/696d76b))
* feat(core-tail): :sparkles: 镂空适配变形,更改配置强度的属性名 ([1a7433e](https://github.com/LeonCry/cursor-with/commit/1a7433e))
* feat(core-tail): :sparkles: 新增断尾配置项 ([4d9b8ca](https://github.com/LeonCry/cursor-with/commit/4d9b8ca))
* feat(core-tail): :sparkles: 修改拖尾为线模式 ([763e90a](https://github.com/LeonCry/cursor-with/commit/763e90a))
* feat(core): :sparkles: 定长方式的track模式 ([582d219](https://github.com/LeonCry/cursor-with/commit/582d219))
* feat(core): :sparkles: 新增弹簧模式 ([5534df9](https://github.com/LeonCry/cursor-with/commit/5534df9))
* feat(core): :sparkles: 新增shadow style ([a8a87e9](https://github.com/LeonCry/cursor-with/commit/a8a87e9))
* feat(core): :sparkles: 新增track模式逻辑 ([c274a9f](https://github.com/LeonCry/cursor-with/commit/c274a9f))
* feat(core): :sparkles: 修改轨迹跟随模式逻辑 ([0ea3f95](https://github.com/LeonCry/cursor-with/commit/0ea3f95))
* feat(cursor): 反色模式优化 ([39245e2](https://github.com/LeonCry/cursor-with/commit/39245e2))
* feat(cursor): 分离follow功能并重构核心逻辑 ([3427bf1](https://github.com/LeonCry/cursor-with/commit/3427bf1))
* feat(cursor): 添加点击效果功能并优化光标渲染顺序 ([55e67b7](https://github.com/LeonCry/cursor-with/commit/55e67b7))
* feat(cursor): 添加点击效果类型和反色模式，优化绘制逻辑 ([c283807](https://github.com/LeonCry/cursor-with/commit/c283807))
* feat(cursor): 添加滚轮事件支持以更新悬停效果 ([fd1a007](https://github.com/LeonCry/cursor-with/commit/fd1a007))
* feat(cursor): 添加停止使用功能 ([c8f67d3](https://github.com/LeonCry/cursor-with/commit/c8f67d3))
* feat(cursor): 添加悬停效果动画和缓动功能 ([4f16b3a](https://github.com/LeonCry/cursor-with/commit/4f16b3a))
* feat(cursor): 添加悬停效果闪烁功能并优化变形限制 ([9cfa827](https://github.com/LeonCry/cursor-with/commit/9cfa827))
* feat(cursor): 添加原生光标绘制功能 ([f019bbe](https://github.com/LeonCry/cursor-with/commit/f019bbe))
* feat(cursor): 添加clickEffect和nativeCursor功能并重构事件处理 ([f57496f](https://github.com/LeonCry/cursor-with/commit/f57496f))
* feat(cursor): 添加hover-use ([329fa02](https://github.com/LeonCry/cursor-with/commit/329fa02))
* feat(cursor): 添加tail拖尾效果功能 添加获取监听结果功能 ([baad236](https://github.com/LeonCry/cursor-with/commit/baad236))
* feat(cursor): 支持自定义容器元素并优化画布定位 ([a4a7f23](https://github.com/LeonCry/cursor-with/commit/a4a7f23))
* feat(docs): 添加中文文档和示例代码 ([66bbdfe](https://github.com/LeonCry/cursor-with/commit/66bbdfe))
* feat(docs): 重构文档结构并更新内容 ([145de01](https://github.com/LeonCry/cursor-with/commit/145de01))
* feat(effect): :sparkles: 初始化转换效果 ([da90792](https://github.com/LeonCry/cursor-with/commit/da90792))
* feat(hoverEffect):  优化颜色渐变与borderWidth渐变 ([eafa341](https://github.com/LeonCry/cursor-with/commit/eafa341))
* feat(types): 为 StyleOptions 添加 needDeform 属性 ([c42194f](https://github.com/LeonCry/cursor-with/commit/c42194f))
* chore: :hammer: 删除冗余文件 ([fe2158b](https://github.com/LeonCry/cursor-with/commit/fe2158b))
* chore: :hammer: 修改构建名字 ([272d9d3](https://github.com/LeonCry/cursor-with/commit/272d9d3))
* chore: 更新cursorwith-ts版本号至1.0.0 ([1ccadf3](https://github.com/LeonCry/cursor-with/commit/1ccadf3))
* refactor: :recycle: 代码重构 ([dbee8dc](https://github.com/LeonCry/cursor-with/commit/dbee8dc))
* refactor(core): 重构事件处理系统并移除无用代码 ([d9144c7](https://github.com/LeonCry/cursor-with/commit/d9144c7))
* refactor(cursor-with): 分包 ([179254e](https://github.com/LeonCry/cursor-with/commit/179254e))
* refactor(cursor-with): 使用私有字段 ([8e675a0](https://github.com/LeonCry/cursor-with/commit/8e675a0))
* refactor(cursor-with): 移除radash依赖并实现自定义debounce函数 ([5c0b6e5](https://github.com/LeonCry/cursor-with/commit/5c0b6e5))
* refactor(cursor): 拆分初始化 ([3cd10a4](https://github.com/LeonCry/cursor-with/commit/3cd10a4))
* refactor(cursor): 将私有字段从#语法改为private关键字 ([97cbfbe](https://github.com/LeonCry/cursor-with/commit/97cbfbe))
* refactor(cursor): 移除computeCurrentPoint并重构跟随逻辑 ([418e1fc](https://github.com/LeonCry/cursor-with/commit/418e1fc))
* refactor(cursor): 重构inverse和click-effect插件实现，支持自定义触发和恢复逻辑 ([726606b](https://github.com/LeonCry/cursor-with/commit/726606b))



## <small>0.1.11 (2025-09-28)</small>

* chore: :hammer: rename ([f42b7db](https://github.com/LeonCry/cursor-with/commit/f42b7db))
* chore: :hammer: update readme.md ([ef09df6](https://github.com/LeonCry/cursor-with/commit/ef09df6))
* chore(build): :hammer: create release and version update ([5ad32ed](https://github.com/LeonCry/cursor-with/commit/5ad32ed))
* feat(core): :sparkles: track模式init ([e727703](https://github.com/LeonCry/cursor-with/commit/e727703))



## <small>0.1.10 (2025-09-28)</small>

* chore: :hammer: update readme.md ([42e2a0a](https://github.com/LeonCry/cursor-with/commit/42e2a0a))
* chore(build): :hammer: create release and update version 0.1.10 ([115d0a7](https://github.com/LeonCry/cursor-with/commit/115d0a7))
* chore(packages): :hammer: 删除github packages的构建,恢复默认库名\ ([2012ed0](https://github.com/LeonCry/cursor-with/commit/2012ed0))



## <small>0.1.9 (2025-09-28)</small>

* chore: :hammer: 新增docs build 自动化脚本 ([978a202](https://github.com/LeonCry/cursor-with/commit/978a202))
* chore: :hammer: 修改包名称 ([0e6ba48](https://github.com/LeonCry/cursor-with/commit/0e6ba48))
* chore: :hammer: 修改部分脚本 修改index.md右侧标识 ([994a8db](https://github.com/LeonCry/cursor-with/commit/994a8db))
* chore: :hammer: 修改docs配置 ([ac355f9](https://github.com/LeonCry/cursor-with/commit/ac355f9))
* chore: :hammer: del commit script ([90e76fd](https://github.com/LeonCry/cursor-with/commit/90e76fd))
* chore: :hammer: update publish.yml ([c8ed402](https://github.com/LeonCry/cursor-with/commit/c8ed402))
* chore: :hammer: update version ([a2fe252](https://github.com/LeonCry/cursor-with/commit/a2fe252))
* chore: :hammer: update version v0.1.7-alpha.3 ([eb11bab](https://github.com/LeonCry/cursor-with/commit/eb11bab))
* chore: :hammer: vitepress初始化 ([16f4794](https://github.com/LeonCry/cursor-with/commit/16f4794))
* chore: ignore VitePress cache directory and remove cached files ([d5c69bd](https://github.com/LeonCry/cursor-with/commit/d5c69bd))
* chore(update): :hammer: create release and version update ([6a2aab5](https://github.com/LeonCry/cursor-with/commit/6a2aab5))
* fix: :bug: 打包脚本修改 ([032878d](https://github.com/LeonCry/cursor-with/commit/032878d))
* fix: :bug: 更新依赖 ([d6dac86](https://github.com/LeonCry/cursor-with/commit/d6dac86))
* fix: :bug: 修复导入名称问题 ([1000703](https://github.com/LeonCry/cursor-with/commit/1000703))
* fix: :bug: 修改错误路径 ([746a127](https://github.com/LeonCry/cursor-with/commit/746a127))
* fix: :bug: 修改脚本version不同步问题 ([c5335fd](https://github.com/LeonCry/cursor-with/commit/c5335fd))
* fix: :bug: 修改自动发版脚本 ([95d7dc7](https://github.com/LeonCry/cursor-with/commit/95d7dc7))
* fix: :bug: 修改core vue-test 执行顺序 ([560f19e](https://github.com/LeonCry/cursor-with/commit/560f19e))
* fix: :bug: update version ([51c6495](https://github.com/LeonCry/cursor-with/commit/51c6495))
* fix(build): :bug: 修改打包配置 ([75c3628](https://github.com/LeonCry/cursor-with/commit/75c3628))
* fix(loop): :bug: 修正gap模式下小于distance时无限抖动的问题 ([540a3a7](https://github.com/LeonCry/cursor-with/commit/540a3a7))
* docs: :memo: 更新文档 ([556057e](https://github.com/LeonCry/cursor-with/commit/556057e))
* docs: :memo: 新增core readme.md文件 ([3192ee9](https://github.com/LeonCry/cursor-with/commit/3192ee9))
* docs: :memo: update logo ([2840062](https://github.com/LeonCry/cursor-with/commit/2840062))
* docs(readme): :memo: 更新readme文档 ([cf59fde](https://github.com/LeonCry/cursor-with/commit/cf59fde))
* docs(style): :memo: 更新文档-style ([4b237d1](https://github.com/LeonCry/cursor-with/commit/4b237d1))
* test: :white_check_mark: 测试workflow ([781fa9d](https://github.com/LeonCry/cursor-with/commit/781fa9d))
* test: :white_check_mark: update .yml ([0a50f4e](https://github.com/LeonCry/cursor-with/commit/0a50f4e))
* test: :white_check_mark: update publish.yml ([810c8f8](https://github.com/LeonCry/cursor-with/commit/810c8f8))
* test: :white_check_mark: update publish.yml ([6dbf6b7](https://github.com/LeonCry/cursor-with/commit/6dbf6b7))
* merge ([6fe5cc0](https://github.com/LeonCry/cursor-with/commit/6fe5cc0))
* version $(node -p "require(./packages/cursor-with/package.json).version") update and release ([0643fb2](https://github.com/LeonCry/cursor-with/commit/0643fb2))
* build: :package: 修改执行脚本顺序 ([fbc0134](https://github.com/LeonCry/cursor-with/commit/fbc0134))
* build(update): :package: version 0.1.6 update and release ([84f80d5](https://github.com/LeonCry/cursor-with/commit/84f80d5))
* feat: :sparkles: 新增右侧gif ([44c4835](https://github.com/LeonCry/cursor-with/commit/44c4835))
* feat(core): :sparkles: 新增图片绘制功能 ([3020115](https://github.com/LeonCry/cursor-with/commit/3020115))
* feat(core): :sparkles: 新增public method ([1d8aaaf](https://github.com/LeonCry/cursor-with/commit/1d8aaaf))
* feat(docs): :sparkles: 新增vitePress-docs文档站点 ([95d1ab1](https://github.com/LeonCry/cursor-with/commit/95d1ab1))
* refactor: :recycle: 去除冗余代码 ([0690e51](https://github.com/LeonCry/cursor-with/commit/0690e51))



## <small>1.0.3 (2025-09-23)</small>

* 1.0.3 ([b02d9b3](https://github.com/LeonCry/cursor-with/commit/b02d9b3))



## <small>1.0.2 (2025-09-23)</small>

* 1.0.2 ([7600798](https://github.com/LeonCry/cursor-with/commit/7600798))
* fix: :bug: 外层version不更改问题 ([3ff6f06](https://github.com/LeonCry/cursor-with/commit/3ff6f06))
* build: :package: 更新git信息 ([01d60b0](https://github.com/LeonCry/cursor-with/commit/01d60b0))



## <small>1.0.1 (2025-09-23)</small>

* 改为pnpm + monorepo 结构,删除多余代码 ([ca4124a](https://github.com/LeonCry/cursor-with/commit/ca4124a))
* 新增测试A ([08091b6](https://github.com/LeonCry/cursor-with/commit/08091b6))
* Create LICENSE ([ebe133e](https://github.com/LeonCry/cursor-with/commit/ebe133e))
* init ([95fa880](https://github.com/LeonCry/cursor-with/commit/95fa880))
* version 1.0.1 release ([f47dde0](https://github.com/LeonCry/cursor-with/commit/f47dde0))
* fix: :bug: 修复打包顺序 ([2ccab7e](https://github.com/LeonCry/cursor-with/commit/2ccab7e))
* fix: :bug: 修复脚本重名问题 ([26b69c4](https://github.com/LeonCry/cursor-with/commit/26b69c4))
* fix: :bug: 修复因打包命令错误导致的发版失败问题 ([e8ea024](https://github.com/LeonCry/cursor-with/commit/e8ea024))
* fix(core): :bug: 修复部分文件引入错误 ([33a44f7](https://github.com/LeonCry/cursor-with/commit/33a44f7))
* docs: :memo: 新增changeLog ([a1981df](https://github.com/LeonCry/cursor-with/commit/a1981df))
* chore: :hammer: 统一utils入口 ([48a4e8e](https://github.com/LeonCry/cursor-with/commit/48a4e8e))
* chore: :hammer: 修改项目private ([f7d49f8](https://github.com/LeonCry/cursor-with/commit/f7d49f8))
* chore(idea): :hammer: 监听函数包装器idea ([98def11](https://github.com/LeonCry/cursor-with/commit/98def11))
* build: :package: 开发脚本优化 ([686c10d](https://github.com/LeonCry/cursor-with/commit/686c10d))
* build: 新增release 和 npm 自动发版 ([9f287f1](https://github.com/LeonCry/cursor-with/commit/9f287f1))
* feat: 初始化canvas创建 ([f2b0a9e](https://github.com/LeonCry/cursor-with/commit/f2b0a9e))
* feat(core): :sparkles: 新增border外圆绘制 ([7d4702f](https://github.com/LeonCry/cursor-with/commit/7d4702f))
* feat(core): :sparkles: 新增resize监听 引入工具函数依赖 修改初始化位置 ([7c6c7b3](https://github.com/LeonCry/cursor-with/commit/7c6c7b3))
* feat(core): :sparkles: add 暂停与恢复功能 ([e3538b3](https://github.com/LeonCry/cursor-with/commit/e3538b3))
* feat(core): 新增定时时间系数与定距离模式cursor移动功能 ([9e7ff26](https://github.com/LeonCry/cursor-with/commit/9e7ff26))
* feat(utils): :sparkles: 监听函数包装器 ([4763b2b](https://github.com/LeonCry/cursor-with/commit/4763b2b))
* refactor: :recycle: 错误处理 ([7089aea](https://github.com/LeonCry/cursor-with/commit/7089aea))
* refactor(core): :recycle: 重构类型定义 ([678c7be](https://github.com/LeonCry/cursor-with/commit/678c7be))
* style: :lipstick: update readme.md & update filename ([99565a6](https://github.com/LeonCry/cursor-with/commit/99565a6))



