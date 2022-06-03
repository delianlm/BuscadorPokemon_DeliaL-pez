# abort on errors
set -e
source .env

# build
rm -rf docs
npm run build
mv dist docs

# commit
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:$GIT_USER/$GIT_REPO.git master
git fetch