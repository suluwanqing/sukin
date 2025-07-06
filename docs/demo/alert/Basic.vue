<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <su-alert type="success">Success alert</su-alert>
    <su-alert type="info">Info alert</su-alert>
    <su-alert type="warning">Warning alert</su-alert>
    <su-alert type="danger">Error alert</su-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <su-alert type="success" title="Success alert" />
    <su-alert type="info" title="Info alert" />
    <su-alert type="warning" title="Warning alert" />
    <su-alert type="danger" title="Error alert" />
  </div>
</template>
