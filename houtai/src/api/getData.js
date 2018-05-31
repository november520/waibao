import fetch from '@/config/fetch'

/**
 * 上传文档
 */

export const uploadOffice = data => fetch('/publish/uploadOffice', data, 'POST');

/**
 * 发布日程
 */

export const publish = () => fetch('/publish');

