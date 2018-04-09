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
                delete tag.attributes.src;
                tag.attributes['inline-chunk-name'] = chunkName;
                tag.innerHTML = sourceMappingURL.removeFrom(
                  $compilation.assets[inlineChunkPath].source()
                );
              }
            }
          }
        }
      );
    });
  }
}
