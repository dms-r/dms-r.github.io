---
title: My Github Note 
tags: [Note]
---
### How to connect to github se ssh?
```bash
#Generate ssh-key
ssh-keygen -t rsa -b 4096 -f ./.ssh/{name file}

eval "$(ssh-agent -s)"

ssh-add .ssh/{name file}

#Copy public key to github
cat ./.ssh/{name file}.pub
#Copy output to github setting about ssh

#Check connection
ssh -T git@github.com
```

### How to push to github?
```bash
#Clone repo 
git clone git@github.com:{username github}/{name repo}.git

#Add file or changes
git add {name file}

#Add comment about commit
git commit -m

#Push all
git push -u origin main
```