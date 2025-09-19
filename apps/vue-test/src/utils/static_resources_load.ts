// 运行时加载静态资源
const modules = import.meta.glob('@/assets/**/*');
export default async function staticResourcesLoad(url: string) {
  const loader = modules[url];
  if (!loader) throw new Error(`Asset not found: ${url}`);
  const mod = await loader() as { default: string };
  return mod.default;
}
