# shanghai-top

sharing the most top stuff of Shanghai in this site.

http://www.caoyong.top
### 启动脚本：
```shell
APP_NAME='shanghai-top'
command='nohup npm run start'
log_file_url="/logs/shanghai-top.log"

start(){
    cd shanghai-top
    if [ "$log_file_url" != "" ]; then
        echo "STARTING $APP_NAME ....."
        exec $command  > "$log_file_url" 2>&1 &
    else
        echo "STARTING $APP_NAME ....."
        exec $command &
    fi
}
stop(){
    echo "STOPING $APP_NAME ....."
    ps -ef | grep /bin/www| grep -v grep | awk '{print $2" "$3}'|xargs kill -9
}
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    *)
        printf 'Usage: %s {start|stop|restart}\n'
        exit 1
        ;;
esac
```