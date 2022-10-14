---
title: IPFS over WebDAV
description: IPFS over WebDAV, a deep dive to figure out the possibilities!
author: Mark Gaiser
date: 2022-10-13
permalink: "/2022-10-13-ipfs-over-webdav/"
translationKey: ''
header_image: "/0003_v2.jpg"
tags: []

---
# IPFS over WebDAV
[WebDAV](https://en.wikipedia.org/wiki/WebDAV) is a protocol that extends the HTTP protocol. The intent is for webserver to also act as fileservers. A user could access WebDAV enabled webservers in their native filebrowser and other locally running applications. It effectively allows managing your files on your webserver straight from your file explorer as if they were local files. This technology, over time, found it's way into every major operating system. What WebDAV has achieved here is where IPFS needs to be to. Easily accessible in your file browser. Let's take a look at why such an ancient protocol could be a good fit for IPFS purposes.

## Cross platform
WebDAV has a [very long history](https://en.wikipedia.org/wiki/WebDAV#History). It's an open standard implemented on top of the existing HTTP protocol. This meant building support for it was not too complex which resulted in very broad platform WebDAV support.

### Windows
Windows has had WebDAV support since at least [Windows 98](https://www.youtube.com/watch?v=6tV1sm0_s_8) and continues to have it to this very day.

*Below a screenshot of IPFS over WebDAV in Windows Explorer*
![](https://i.imgur.com/cUGpjeR.png)


### Mac
Mac has had WebDAV support for a long time too, in various degrees. Mac OS X 10.4 Tiger added secure access to WebDAV.

### Linux
In Linux there are various desktop environments. For the comparison we can look at Gnome (Gvfs is their IO layer) and KDE (KIO is their IO layer).

* **Gnome** gained WebDAV support in 2000.
* **KDE** gained [WebDAV support](https://github.com/KDE/kdelibs/blame/1c5b25966136b6099665477616fb4d38a98fd7ef/kioslave/http/webdavs.protocol) in 2002.

*Below a screenshot of IPFS over WebDAV in Dolphin (KDE's/Plasma's default file browser).*
![](https://i.imgur.com/nKlCqm4.png)

### iOS and Android
The story on mobile is a little different. The stock file browsers you get there are quite limited and don't offer many (or any) special feature. Third-party file browsers do provide more functionality in their app stores. 

* For Android, there is [Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2&hl=en&gl=US) which offers very good WebDAV support. Alternatively ther is also [Cx File Explorer](https://play.google.com/store/apps/details?id=com.cxinventor.file.explorer&hl=en&gl=US).
* For iOS there is [WebDAV Navigator](https://apps.apple.com/us/app/webdav-navigator/id382551345). Both platforms offer more apps that support WebDAV.

*Below a screenshot of IPFS over WebDAV in Cx File Explorer on Android.*

![](https://i.imgur.com/jIMumCL.jpg)

### WebDAV is everywhere!
The above makes clear that WebDAV is available on every major platform, so we wanted to experiment with making IPFS over WebDAV a thing.For all we knew, it could be the sweet spot protocol making IPFS more widely and easily usable.

However, we had to evaluate how feasible this project was. This blog post answers that question and covers our findings when experimenting with WebDAV.

## Who uses WebDAV?
The first thing we needed to know is the current use of WebDAV in the (web)storage world. This would be a telling indicator of its popularity and could provide some ideas and insights on how we could use it for IPFS purposes.

A table  can tell the story a lot better. Below are the top 10 cloud storage providers (according to [this site](https://www.cloudwards.net/best-cloud-storage/)) with their WebDAV support.

| Product | Out of the box WebDAV? | Third party WebDAV? |
| -------- | -------- | -------- |
| [Dropbox](https://www.dropbox.com/)     | :x: | :heavy_check_mark: |
| [Filen](https://filen.io/)     | :x: | :x: |
| [Google Drive](https://www.google.com/drive/)     | :x: | :heavy_check_mark: |
| [icedrive](https://icedrive.net/)     | :heavy_check_mark: | :heavy_check_mark: |
| [Jumpshare](https://jumpshare.com/)     | :x: | :x: |
| [KOOFR](https://koofr.eu/)     | :x: | :x: |
| [MEGA](https://mega.io/)     | :heavy_check_mark: | :heavy_check_mark: |
| [oneDrive](https://onedrive.live.com/)     | :x: | :heavy_check_mark: |
| [pCloud](https://www.pcloud.com/)     | :heavy_check_mark: | :heavy_check_mark: |
| [sync.com](https://www.sync.com/)     | :x: | :x: |


The table shows a couple things clearly.
1. Storage providers don't often provide WebDAV support out of the box.
2. There is still *some* demand for WebDAV support because over half of the above 10 have at least 1 third party tool making WebDAV possible.

That being said, it does really look like WebDAV is past its heyday. The increasingly more popular need for encrypted storage makes WebDAV difficult - if not impossible - to support. 

Other clues hinting at this are the fairly few projects found on Github. When [searching for WebDAV](https://github.com/search?q=webdav&type=repositories) we find all clients and server implementations, thus skewing the results a bit. If we narrow it down to just [WebDAV server](https://github.com/search?q=webdav+server&type=repositories) implementations, the results are very few. (Note that this is still skewed since it matches `Sync local files and directories to a WebDAV server` too, which isn't a WebDAV server.)

## How does IPFS map on WebDAV?
These days, WebDAV is used more as a tool to synchronize a remote folder with a local one. That is, however, just a subset of the intent. 

WebDAV was designed to make your webserver act as a fileserver over the same web protocol. With your file explorer you could then connect to your webserver, with WebDAV enabled, and it would show you files and folders just like browsing any local files and folders in your explorer. 

Another way to look at it is to imagine integrating FTP functionality inside a webserver so there is effectively no need for FTP at all. Just a webserver would suffice.

One of the requirements for such functionality is the ability to browse files and folders. This is what WebDAV can offer to IPFS: an easy way to access files and folders on the network. It would allow users to browse data without even knowing that IPFS is used under the hood.

## Potential WebDAV benefits
WebDAV as a standard extends the HTTP methods to their needs. This being standardized helps to consider supporting part of it if that makes IPFS more easily usable. It even opens up new usecases, such as:
1. A writable gateway. Think of [MFS](https://docs.ipfs.tech/concepts/file-systems/#mutable-file-system-mfs).
2. IPFS integrations in applications currently supporting WebDAV already.
3. Out-of-the-box IPFS support via WebDAV on Windows, macOS and Linux.
4. Android and iOS support via one of the many apps.

There are more potential benefits but this short list is already huge in what WebDAV support could bring.

## WebDAV and the Go language
The IPFS reference implementation, KUBO, is written in Go. There seems to be a complete [WebDAV server package](https://pkg.go.dev/golang.org/x/net/webdav) for Go. On a technical level, this package makes it at least achievable to consider implementing WebDAV support in KUBO.

## Proof of concept: Separate WebDAV server in NodeJS
A few months ago, Mark Gaiser set out to create a proof of concept (POC) project in NodeJS. That language was chosen because of the ease of rapid development and because of the availability of an already fully working [WebDAV server](https://github.com/OpenMarshal/npm-WebDAV-Server) package.

*"The approach I wanted to take here was to use as much existing components as possible. For example, with that webdav server there are a couple ways to start such a server. The easiest way was to set a specific folder as your "webdav folder" which that server package would serve."* — Mark Gaiser

Another way would be to follow that package logic and create a [custom filesystem](https://github.com/OpenMarshal/npm-WebDAV-Server/wiki/Custom-File-System-%5Bv2%5D). 

After a lot of testing Mark came to the conclusion that he needed to implement a virtual file system in one form or another. The thinking here was that a virtual filesystem would be beneficial to have even if WebDAV didn't turn out as desired. 

If this virtual filesystem were to exist, users could use the nodejs filesystem function to read files from IPFS, for example. Effectively what was needed was a library that was compatible with NodeJS's [fs](https://nodejs.org/api/fs.html) API.

Conceptually, it was now at the same level as a virtual filesystem for other cloud storage providers. One example is [this package](https://www.npmjs.com/package/dropbox-fs) achieving exactly the desired effect but for Dropbox instead. 

There are many more packages like that out there, creating what is effectively a fs implementation. As each implementation is different, there was no way to reuse existing projects in this regard. However, there were ways to look at some of their concepts and reuse parts of them.

## Virtual filesystem approach leads to WebDAV server fork
While the [WebDAV server](https://github.com/OpenMarshal/npm-WebDAV-Server) package allowed for defining a native fs path, it didn't have a way to provide a custom fs implementation object. The developer of that package informed that a patch for that would be welcome if accompanied with proper tests.

Mark forked their repository with the intent of creating a PR "at some future time." For the time being though, it lives in it's [own repository](https://github.com/markg85/npm-WebDAV-Server). In time, this might be merged back if the extra time is put in to make it acceptable.

With this fork in place, any virtual filesystem object that implements Node's fs functions can be used to be served as a WebDAV directory. This approach worked with the [dropbox virtual filesystem package](https://www.npmjs.com/package/dropbox-fs), with a small modification. This proved that a virtual filesystem approach would likely work.

## IPFS-backed virtual filesystem in nodejs
**Disclaimers:**
1. This library is a work in progress.
2. The quality serves for testing purposes only.
3. It needs more work to be reusable.
4. Don't reuse this!

With that out of the way, it is possible to make a [virtual filesystem that is backed by IPFS](https://github.com/markg85/webdavipfs/blob/main/lib/vfs.js)! However, be aware that this library was created with the aim to figure out if we should add WebDAV support in the gateway code. 

This library is therefore **not** using the gateway (it wouldn't make sense within the gateway context) but is instead using the internal IPFS HTTP API from port 5001. That means this library is only actually useful if you're running a local node.

This library will be made more useful over time. Mark plans to:
1. Allow to choose the backend handling. Like using the internal HTTP API or the gateway API.
2. Write support.
3. Add it on npmjs under a to-be-determined name.

The idea is that builders should be able to run "native looking" nodejs fs functions on that library. Here's an example of what should become possible:
```javascript
const fsObj = require('to-be-determined')({
  apiBackend: {
    type: <something>.INTERNAL,
    port: 5001
  }
});

fsObj.readdir('ipfs://<CID>', (err, result) => {
  // Lists folder content
  console.log(result);
});
```

## IPFS over WebDAV results
With the virtual filesystem backed by IPFS in place we have a working IPFS over WebDAV application. Now we finally have the ability to answer "how feasible is IPFS over WebDAV?"

To answer this, Mark ran a range of tests on different platforms and two WebDAV implementations. The table should be read as follows:

* The fist emoji in each column represents my implementation in NodeJS. 
* The second emoji represents the WebDAV implementation in `rclone`. (This implementation was chosen because it is written in Go and seems well supported.)


| *testcase* | Windows | Linux (KDE) | Android (Solid Explorer) |
| ---------- | ------- | ----- | --------------- |
| File opens |:cry::cry:|:cry::cry:|:smile::smile:|
| Streaming  |:angry::angry:|:angry::angry:|:unicorn_face::smile:|
| Browsing |:cry::cry:|:smile::smile:|:cry::cry:|
| Metadata works |:smile::smile:|:smile::smile:|:smile::smile:|
| Write prevents |:angry::angry:|:angry::angry:|:angry::angry:|
| Copy |:cry::cry:|:smile::smile:|:smile::smile:|
| Placeholder readme|:smile::smile:|:smile::smile:|:smile::smile:|

Legend:
:angry: = Not working at all. No clear path to fix it either.
:cry: = Works in specific condition or needs manual steps. See note for specific app.
:smile: = All good.
:unicorn_face: = Anyone's guess. Not able to properly test but looks to be working great.

**File opens**
The happy face would be that a file - any file - would open just like any file normally opens in a file browser. 

This turned out to not be the case in Windows and Linux. Windows has a 50MB file limit for anything in WebDAV. Opening any files below that side works "ok'ish." Opening files above 50MB just downright fails with no error or warning at all. 

Linux (at least KDE's Dolphin) doesn't have this size limitation. Both have the limitation that each file being opened is first downloaded (you don't get any feedback about that) and opens after the download is completed. That could take a long time.

**Streaming**
Streaming is much related to file opening. Neither Windows or Linux do that as they need to download the data as a whole before it starts playing. 

Android (Solid Explorer) has a sort of "streaming service" that runs in the background. It appears to download the file in chunks and handles it in those chunks too. This gives the user an experience of the file playing immediately no matter large it is. Experiences with Solid Explorer will feel like a native filesystem, in this regard.

**Browsing**
Users would expect to be able to browse to `/ipfs/<cid>`when using the Dolphin file browser under KDE. However, on Android and Windows it doesn't work that way. The reason is complicated. 

Say on Windows you want to browse to `/ipfs/<cid>`, you can if your `/ipfs` folder has that `<cid>` as subfolder. But you don't have that. You don't know which CID's you can browser in `/ipfs` thus windows (and Solid Explorer on Android) just don't work. 

They don't know the child in the given parent. KDE's Dolphin simply doesn't care in this case and tries to open it regardless, which is why it works there. For Windows and Android (Solid Explorer) you have to specify the exact point you want to browse at the moment of making a WebDAV connection. So if you made a connection to `/ipfs/<cid_x>` and you then want to browse to `/ipfs/<cid_y>`, you have to edit your WebDAV connection to that new CID you want to browse.

**Metadata works**
These are the file attributes that define how your file browser presents entries. For example, an entry with a folder type should be presented as a folder and not as a json file, for example. This works fine for all tested environments.

**Write prevents**
Write prevents have to be specifically highlighted. WebDAV itself doesn't have an explicit read-only mode. Therefore, what we're trying here isn't fully supported by WebDAV to begin with. 

Here the disclaimer of "There will be lots of bugs!" applies. Handling this gracefully is just an implementation detail for a future time.

**Copy**
On Windows, this experience is poor as you can again only interact with files that are within that 50MB limit. If you interact with anything larger (that includes copy) then it doesn't work. The other tested environments work just fine here.

**Placeholder readme**
Placeholder readme's are magical files that you will see on `/ipfs` and `/ipns`. These readme files are just stub single-line files to demonstrate that can be done, too. If you're using Windows or Android you likely never see these as you have to make a mapping there directly to `/ipfs/<cid>`.

## IPFS over WebDAV future
We're looking for your opinion! What do you think of these results? What kind of usecases can you imagine with a potential WebDAV-enabled gateway? If you have an opinion in this we very much welcome you to share your thoughts and help us pick a path forward with WebDAV.

You can reach out to us directly on [Slack](https://filecoin.io/slack), [Discord](https://discord.gg/ipfs), [Matrix](https://matrix.to/#/#ipfs-space:ipfs.io) or the [forum](https://discuss.ipfs.tech/).

### You can help!
Making IPFS more broadly accessible is always a great goal to keep in mind. If you are interested in this project and want to improve it, feel free to hack away on the [code](https://github.com/markg85/webdavipfs). 

If you have larger changes in mind then it might be worth having a look at our [Open Grant](https://github.com/ipfs/devgrants) options and give it a try.

If you know of any projects you find interesting where WebDAV is supported but IPFS isn't, please send us that hint as a Github issue [here](https://github.com/ipfs/integrations/issues).

## Can I run this?
Sure! [This repository](https://github.com/markg85/webdavipfs) provides the details on how to run this whole experiment yourself.