import { compilation, Compiler, Plugin } from 'webpack';
// tslint:disable-next-line:no-var-requires
const sourceMappingURL = require('source-map-url');

export interface ChunkInlineHtmlPluginOptions {
  inlineChunks: string[];
}

export default class ChunkInlineHtmlPlugin implements Plugin {
  options: ChunkInlineHtmlPluginOptions;
  constructor(options: ChunkInlineHtmlPluginOptions) {
    this.options = {
      inlineChunks: [],
      ...options
    };
  }
  apply(compiler: Compiler) {
    let needRemoveChunks: string[] = [];
    // 删掉已经内联注入的 chunk
    compiler.plugin(
      'emit',
      ($compilation: compilation.Compilation, callback: () => void) => {
        for (const chunk of needRemoveChunks) {
          delete $compilation.assets[chunk];
        }
        callback();
      }
    );
    // 情况内联依赖的 chunk
    compiler.plugin(
      'after-emit',
      (_compilation: compilation.Compilation, callback: () => void) => {
        needRemoveChunks = [];
        callback();
      }
    );
    compiler.plugin('compilation', ($compilation: compilation.Compilation) => {
      $compilation.plugin(
        'html-webpack-plugin-alter-asset-tags',
        // tslint:disable-next-line:no-any
        (htmlPluginData: any) => {
          const publicPath: string =
            $compilation.outputOptions.publicPath || '';
          for (const chunkName of this.options.inlineChunks) {
            const inlineChunk = $compilation.chunks.filter(
              chunk => chunk.name === chunkName
            )[0];
            const inlineChunkPath =
              (inlineChunk && (inlineChunk.files[0] as string)) || null;
            if (!inlineChunkPath) {
              return;
            }
            for (const tag of htmlPluginData.body) {
              if (
                tag.tagName === 'script' &&
                tag.attributes.src === publicPath + inlineChunkPath
              ) {
                tag.attributes['inline-chunk-name'] = chunkName;
                tag.innerHTML = sourceMappingURL.removeFrom(
                  $compilation.assets[inlineChunkPath].source()
                );
                delete tag.attributes.src;
              }
            }
            needRemoveChunks.push(inlineChunkPath);
          }
        }
      );
    });
  }
}
