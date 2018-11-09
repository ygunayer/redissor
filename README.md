# redissor
Just a silly tool to test Redis connectivity.

## Usage
Simply run as a foreground process and examine the output.

Upon connecting to Redis, the tool will execute the `KEYS` command, print the number of keys retrieved, and exit with code `0`.

If this fails somehow, the captured error will be output and the tool will exit with code `1`.
