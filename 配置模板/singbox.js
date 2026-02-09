{
  "dns": {
    "servers": [
      { "tag": "google", "type": "https", "server": "8.8.8.8", "detour": "proxy" },
      { "tag": "ali", "type": "https", "server": "223.5.5.5" },
      { "tag": "fakeip", "type": "fakeip", "inet4_range": "198.18.0.0/15", "inet6_range": "fc00::/18" }
    ],
    "rules": [
      { "clash_mode": "Direct", "action": "route", "server": "ali" },
      { "clash_mode": "Global", "action": "route", "server": "fakeip" },
      { "query_type": "HTTPS", "action": "reject" },
      { "query_type": ["A", "AAAA"], "action": "route", "server": "fakeip", "rewrite_ttl": 1 },
      { "rule_set": "cn_domain", "action": "route", "server": "ali" }
    ],
    "final": "google",
    "independent_cache": true
  },
  "route": {
    "default_domain_resolver": { "server": "ali" },
    "rules": [
      { "action": "sniff", "sniffer": ["http", "tls", "quic", "dns"], "timeout": "500ms" },
      { "type": "logical", "mode": "or", "rules": [{ "port": 53 }, { "protocol": "dns" }], "action": "hijack-dns" },
      { "ip_is_private": true, "action": "route", "outbound": "direct" },
      { "clash_mode": "Global", "action": "route", "outbound": "GLOBAL" },
      { "clash_mode": "Direct", "action": "route", "outbound": "direct" },
      { "rule_set": "openai_domain", "action": "route", "outbound": "openai" },
      { "rule_set": ["telegram_ip", "telegram_domain"], "action": "route", "outbound": "telegram" },
      { "rule_set": ["cn_ip", "cn_domain"], "action": "route", "outbound": "cn" },
      { "type": "logical", "mode": "and", "rules": [{ "rule_set": "proxy_domain" }, { "invert": true, "rule_set": ["cn_domain", "telegram_domain"] }], "action": "route", "outbound": "proxy" }
    ],
    "rule_set": [
      { "tag": "cn_ip", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geoip/cn.srs", "download_detour": "direct" },
      { "tag": "cn_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/cn.srs", "download_detour": "direct" },
      { "tag": "openai_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/openai.srs", "download_detour": "direct" },
      { "tag": "proxy_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/geolocation-!cn.srs", "download_detour": "direct" },
      { "tag": "telegram_ip", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/telegram.srs", "download_detour": "direct" },
      { "tag": "telegram_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/telegram.srs", "download_detour": "direct" }
    ],
    "final": "final",
    "auto_detect_interface": true
  },
  "outbounds": [
    {
      "tag": "proxy",
      "type": "selector",
      "outbounds": ["sg", "sg-auto", "jp", "jp-auto", "us", "us-auto", "eu", "eu-auto", "all", "all-auto", "direct"],
      "default": "all-auto"
    },
    { "tag": "telegram", "type": "selector", "outbounds": ["proxy", "direct", "sg", "sg-auto", "jp", "jp-auto", "us", "us-auto", "eu", "eu-auto"], "default": "proxy" },
    { "tag": "openai", "type": "selector", "outbounds": ["proxy", "direct", "sg", "sg-auto", "jp", "jp-auto", "us", "us-auto", "eu", "eu-auto"], "default": "proxy" },
    { "tag": "cn", "type": "selector", "outbounds": ["proxy", "direct"], "default": "direct" },
    { "tag": "final", "type": "selector", "outbounds": ["proxy", "direct"], "default": "proxy" },
    
    { "tag": "jp", "type": "selector", "outbounds": [] },
    { "tag": "sg", "type": "selector", "outbounds": [] },
    { "tag": "us", "type": "selector", "outbounds": [] },
    { "tag": "eu", "type": "selector", "outbounds": [] },
    { "tag": "all", "type": "selector", "outbounds": [] },

    { "tag": "jp-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m" },
    { "tag": "sg-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m" },
    { "tag": "us-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m" },
    { "tag": "eu-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m" },
    { "tag": "all-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m" },

    { "tag": "GLOBAL", "type": "selector", "outbounds": ["direct", "proxy", "sg", "sg-auto", "jp", "jp-auto", "us", "us-auto", "eu", "eu-auto"], "default": "direct" },
    { "tag": "direct", "type": "direct" }
  ],
  "inbounds": [
    { "type": "tun", "address": ["172.19.0.0/30", "fdfe:dcba:9876::0/126"], "stack": "mixed", "auto_route": true },
    { "type": "mixed", "listen": "127.0.0.1", "listen_port": 7890 }
  ],
  "experimental": {
    "clash_api": {
      "external_controller": "127.0.0.1:9097",
      "external_ui": "ui"
    },
    "cache_file": { "enabled": true, "store_fakeip": true }
  }
}