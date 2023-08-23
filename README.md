# Web Crawler

A simple web crawler that takes a URL and crawls all internal pages. It will print out all the links sorted by the number of times they were found and separated by internal and external links.

## Example
```console
foo@bar:~$ npm run start https://daniilgaltsev.github.io/dataviz_course/
...<crawling logs>...
Report:
Internal links:
daniilgaltsev.github.io/dataviz_course: 218
daniilgaltsev.github.io/dataviz_course/index.html: 14
daniilgaltsev.github.io/dataviz_course/playing_with_altair.html: 7
daniilgaltsev.github.io/dataviz_course/exploring_the_data.html: 7
daniilgaltsev.github.io/dataviz_course/creating_visualization_prototypes.html: 7
daniilgaltsev.github.io/dataviz_course/evaluation_and_overview.html: 7

External links:
github.com/daniilgaltsev/dataviz_course/issues/new: 6
www.kaggle.com/datasets/ruchi798/data-science-job-salaries: 3
github.com/daniilgaltsev/dataviz_course/blob/main/dataviz_course/explore_data.py: 2
```
