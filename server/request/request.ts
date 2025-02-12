import SyncRequest from './sync'
import NewResourceRequest from './new_resource'
import NewTextureRequest from './new_texture'
import UpdateGeomRequest from './update_geom'

class InvalidRequest {
  action = 'invalid' as const
}

class WebSocketRequest {
  static parse = (
    msg: string
  ):
    | SyncRequest
    | NewResourceRequest
    | NewTextureRequest
    | UpdateGeomRequest
    | InvalidRequest => {
    let json: { action?: string }
    try {
      json = JSON.parse(msg)
    } catch (error) {
      return new InvalidRequest()
    }

    if (json.action === 'sync') {
      return new SyncRequest()
    } else if (json.action === 'new-resource') {
      return new NewResourceRequest(json)
    } else if (json.action === 'new-texture') {
      return new NewTextureRequest(json)
    } else if (json.action === 'update-geom') {
      return new UpdateGeomRequest(json)
    } else {
      return new InvalidRequest()
    }
  }
}

export default WebSocketRequest
