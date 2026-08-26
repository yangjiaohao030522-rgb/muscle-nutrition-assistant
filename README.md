# 增肌营养助手

本地优先的手机营养追踪 PWA。核心动作：看缺口、记饮食、配下一顿。

## 功能

- 首次填写身体数据，以 Mifflin-St Jeor 公式计算增肌热量和三大营养素目标
- 本地规则解析中文饮食输入，例如“3个鸡蛋，250ml牛奶，两片全麦面包，一根香蕉”
- 食物搜索、自定义食物、份量确认、饮食记录编辑/删除/复制
- 根据当日剩余缺口排序推荐本地食谱，并可一键加入当天饮食
- 7 天摄入趋势、体重记录、目标手动修改
- IndexedDB 本地保存（同时提供 localStorage 备份）、JSON 导入导出及清除数据
- PWA manifest、Service Worker、iPhone Safe Area 与离线核心功能

## 本地运行

需要 Node.js 22+。

```bash
pnpm install
pnpm dev
```

浏览器打开终端显示的本地地址。构建生产版本：

```bash
pnpm build
```

## 安装为 PWA

- iPhone：使用 Safari 打开应用，点分享按钮，选择“添加到主屏幕”。
- Android：使用 Chrome 打开应用，在菜单中选择“安装应用”。

## 目录说明

- `app/components/App.tsx`：主要页面和可操作界面
- `app/data/foods.ts`：本地食物数据库与别名
- `app/data/recipes.ts`：本地食谱与缺口匹配评分
- `app/lib/nutrition.ts`：BMR、TDEE、目标与营养计算
- `app/lib/foodParser.ts`：可替换的本地自然语言解析器
- `app/lib/storage.ts`：IndexedDB 与本地备份存储
- `public/manifest.webmanifest`、`public/sw.js`：PWA 和离线缓存

## 扩展

新增食物请修改 `app/data/foods.ts` 中的 `seeds`；更大规模食物库可拆分到单独数据文件。新增食谱请修改 `app/data/recipes.ts`。如需接入 AI，将 `app/lib/foodParser.ts` 中的 `parseFoodInput` 替换为符合 `ParsedFood` 返回结构的实现即可；当前版本不调用任何 AI API。
