export const patchRendererWorker = (content, remoteUrl = '', useRemoteUrl = true) => {
  let newContent = content

  if (useRemoteUrl && remoteUrl && !newContent.includes('// const textSearchWorkerUrl = ')) {
    const occurrence = `const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\``
    const replacement = `// const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\`
const textSearchWorkerUrl = \`${remoteUrl}\``

    newContent = newContent.replace(occurrence, replacement)
  }

  if (!useRemoteUrl && remoteUrl && newContent.includes('// const textSearchWorkerUrl = ')) {
    const occurrence = `// const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\`
const textSearchWorkerUrl = \`${remoteUrl}\``
    const replacement = `const textSearchWorkerUrl = \`\${assetDir}/packages/text-search-worker/dist/textSearchWorkerMain.js\``
    newContent = newContent.replace(occurrence, replacement)
  }

  const brokenSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {
    const actionsDomIndex = commands.findIndex(command => command[2] === 'setActionsDom');
    if (actionsDomIndex) {
      actionsDom = commands[actionsDomIndex][3];
      commands.splice(actionsDomIndex, 1);
    }
    const eventsIndex = commands.findIndex(command => command[0] === 'Viewlet.registerEventListeners');
    const events = commands[eventsIndex][2];
    actionsUid = create$14();
    commands.push(['Viewlet.createFunctionalRoot', moduleId, actionsUid, true], ['Viewlet.registerEventListeners', actionsUid, events], ['Viewlet.setDom2', actionsUid, actionsDom], ['Viewlet.setUid', actionsUid, childUid]);`

  const partiallyFixedSideBarSnippet = `  let actionsDom = [];
  let actionsUid = -1;
  if (commands) {
    const actionsDomIndex = commands.findIndex(command => command[2] === 'setActionsDom');
    if (actionsDomIndex !== -1) {
      actionsDom = commands[actionsDomIndex][3];
      commands.splice(actionsDomIndex, 1);
    }
    const eventsIndex = commands.findIndex(command => command[0] === 'Viewlet.registerEventListeners');
    const events = eventsIndex === -1 ? [] : commands[eventsIndex][2];
    actionsUid = create$14();
    commands.push(['Viewlet.createFunctionalRoot', moduleId, actionsUid, true], ['Viewlet.registerEventListeners', actionsUid, events], ['Viewlet.setDom2', actionsUid, actionsDom], ['Viewlet.setUid', actionsUid, childUid]);`

  const safeSideBarSnippet = `  let actionsUid = -1;
  if (commands) {`

  if (newContent.includes(brokenSideBarSnippet)) {
    newContent = newContent.replace(brokenSideBarSnippet, safeSideBarSnippet)
  }

  if (newContent.includes(partiallyFixedSideBarSnippet)) {
    newContent = newContent.replace(partiallyFixedSideBarSnippet, safeSideBarSnippet)
  }

  const missingActionsUidSnippet = `  }, false, true);
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {`
  const fixedActionsUidSnippet = `  }, false, true);
  let actionsUid = -1;
  if (state.currentViewletRequestId !== requestId || state.currentViewletId !== moduleId) {`

  if (newContent.includes(missingActionsUidSnippet) && !newContent.includes(fixedActionsUidSnippet)) {
    newContent = newContent.replace(missingActionsUidSnippet, fixedActionsUidSnippet)
  }

  const commandInitializerSnippet = `const initializeModule = module => {
  if (module.Commands) {
    for (const [key, value] of Object.entries(module.Commands)) {`
  const asyncCommandInitializerSnippet = `const initializeModule = async module => {
  if (module.Commands) {
    const commands = module.getCommands && Object.keys(module.Commands).length === 0 ? await module.getCommands() : module.Commands;
    for (const [key, value] of Object.entries(commands)) {`
  newContent = newContent.replace(commandInitializerSnippet, asyncCommandInitializerSnippet)

  newContent = newContent.replace(
    `    const module = await state.load(moduleId);
    initializeModule(module);`,
    `    const module = await state.load(moduleId);
    await initializeModule(module);`,
  )
  newContent = newContent.replace(
    `    const module = await state$A.load(moduleId);
    initializeModule(module);`,
    `    const module = await state$A.load(moduleId);
    await initializeModule(module);`,
  )

  newContent = newContent.replace(
    `  await getOrLoadModule(ModuleMap.getModuleId(command));`,
    `  if (command.startsWith('Search.')) {
    await loadModule(load$3, Search);
    return;
  }
  await getOrLoadModule(ModuleMap.getModuleId(command));`,
  )
  newContent = newContent.replace(
    `  await getOrLoadModule(getModuleId$2(command));`,
    `  if (command.startsWith('Search.')) {
    await loadModule(load$3, Search);
    return;
  }
  await getOrLoadModule(getModuleId$2(command));`,
  )

  return newContent
}
