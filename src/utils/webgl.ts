import type { WebGLCapabilities } from '../types/sanctuary';

export function detectWebGLCapabilities(): WebGLCapabilities {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      supported: false,
      isSoftwareRenderer: true,
      rendererName: 'SSR / Unavailable',
      recommendedTier: 'fallback',
    };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      return {
        supported: false,
        isSoftwareRenderer: true,
        rendererName: 'No WebGL Context',
        recommendedTier: 'fallback',
      };
    }

    const debugExt = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererParam = debugExt ? debugExt.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const rendererName = String(gl.getParameter(rendererParam) || 'WebGL Renderer');
    const isSoftwareRenderer = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
      rendererName,
    );

    gl.getExtension('WEBGL_lose_context')?.loseContext();

    return {
      supported: true,
      isSoftwareRenderer,
      rendererName,
      recommendedTier: isSoftwareRenderer ? 'balanced' : 'high',
    };
  } catch {
    return {
      supported: false,
      isSoftwareRenderer: true,
      rendererName: 'WebGL Detection Error',
      recommendedTier: 'fallback',
    };
  }
}
