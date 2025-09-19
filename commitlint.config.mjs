export default {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀(可选):',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
    },
    // prettier-ignore
    types: [
      { value: 'feat', name: '✨特性(feat):     新增功能', emoji: ':sparkles:' },
      { value: 'fix', name: '🐞修复(fix):      修复缺陷', emoji: ':bug:' },
      { value: 'docs', name: '📝文档(docs):     文档变更', emoji: ':memo:' },
      { value: 'style', name: '🎨格式(style):    代码格式（不影响功能，例如空格、分号等格式修正）', emoji: ':lipstick:' },
      { value: 'refactor', name: '🔄重构(refactor): 代码重构（不包括 bug 修复、功能新增）', emoji: ':recycle:' },
      { value: 'perf', name: '🥇性能(perf):     性能优化', emoji: ':zap:' },
      { value: 'test', name: '🧪测试(test):     添加疏漏测试或已有测试改动', emoji: ':white_check_mark:' },
      { value: 'build', name: '📦️构建(build):    构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）', emoji: ':package:' },
      { value: 'ci', name: '🎡集成(ci):       修改 CI 配置、脚本', emoji: ':ferris_wheel:' },
      { value: 'revert', name: '⏪️回退(revert):   回滚 commit', emoji: ':rewind:' },
      { value: 'chore', name: '🔨其他(chore):    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）', emoji: ':hammer:' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
  },
};
