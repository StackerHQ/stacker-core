import path from 'path';

import DataSet from '../../utils/DataSet';


export default class StackServiceVolumes extends DataSet {
  constructor(service, data) {
    super(data);
    this.service = service;
  }
  toDockerCompose(target, projectPath) {
    let volumes = this.getPersistentVolumes();

    if (target === 'dev') {
      volumes = volumes.concat([
        ...this.getSyncedVolumes(projectPath).map(pair => pair.join(':')),
        ...this.service.getEjectedFiles(projectPath).map(pair => pair.join(':')),
      ]);
    }

    return volumes.length ? volumes : null;
  }
  getPersistentVolumes() {
    return this.values().filter(value => this.isVolumePersistent(value));
  }
  getSyncedVolumes(projectPath) {
    return this.values().reduce((acc, value) => {
      if (!this.isVolumePersistent(value)) {
        const tokens = value.split(':');
        tokens[0] = path.resolve(projectPath, tokens[0]);
        acc.push(tokens);
      }
      return acc;
    }, []);
  }
  isVolumePersistent(value) {
    const tokens = value.split(':');
    if (tokens.length === 1) return true;
    if (tokens[0].match(/^[^.~/]/)) return true;
    return false;
  }
}
