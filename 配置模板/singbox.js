{
  "log": { "level": "info", "timestamp": true },
  "dns": {
    "servers": [
      { "tag": "google", "type": "https", "server": "8.8.8.8", "detour": "proxy" },
      { "tag": "ali", "type": "https", "server": "223.5.5.5" },
      { "tag": "fakeip", "type": "fakeip", "inet4_range": "198.18.0.0/15" }
    ],
    "rules": [
      { "clash_mode": "Direct", "action": "route", "server": "ali" },
      { "clash_mode": "Global", "action": "route", "server": "fakeip" },
      { "query_type": ["A", "AAAA"], "action": "route", "server": "fakeip", "rewrite_ttl": 1 },
      { "rule_set": "cn_domain", "action": "route", "server": "ali" }
    ],
    "final": "google",
    "independent_cache": true,
    "client_subnet": "1.0.1.0" 
  },
  "route": {
    "rules": [
      { "action": "sniff", "sniffer": ["http", "tls", "quic", "dns"], "timeout": "300ms" },
      { "protocol": "dns", "action": "hijack-dns" },
      { "ip_is_private": true, "action": "route", "outbound": "direct" },
      { "clash_mode": "Global", "action": "route", "outbound": "GLOBAL" },
      { "clash_mode": "Direct", "action": "route", "outbound": "direct" },
      { "rule_set": "openai_domain", "action": "route", "outbound": "openai" },
      { "rule_set": ["telegram_ip", "telegram_domain"], "action": "route", "outbound": "telegram" },
      { "rule_set": ["cn_ip", "cn_domain"], "action": "route", "outbound": "cn" }
    ],
    "rule_set": [
      { "tag": "cn_ip", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geoip/cn.srs", "download_detour": "direct" },
      { "tag": "cn_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/cn.srs", "download_detour": "direct" },
      { "tag": "openai_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/openai.srs", "download_detour": "direct" },
      { "tag": "telegram_ip", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/telegram.srs", "download_detour": "direct" },
      { "tag": "telegram_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/telegram.srs", "download_detour": "direct" }
    ],
    "auto_detect_interface": true,
    "final": "proxy"
  },
  "outbounds": [
    { "tag": "openai", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png", "outbounds": ["proxy", "us", "us-auto", "sg", "sg-auto", "jp", "jp-auto", "eu", "eu-auto", "direct"] },
    { "tag": "telegram", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png", "outbounds": ["proxy", "sg", "sg-auto", "jp", "jp-auto", "us", "us-auto", "eu", "eu-auto", "direct"] },
    { "tag": "proxy", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png", "outbounds": ["all-auto", "sg", "jp", "us", "eu", "direct"] },
    
    { "tag": "sg", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png", "outbounds": [] },
    { "tag": "jp", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png", "outbounds": [] },
    { "tag": "us", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png", "outbounds": [] },
    { "tag": "eu", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/European_Union.png", "outbounds": [] },
    { "tag": "all", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Available.png", "outbounds": [] },

    { "tag": "sg-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "5m", "tolerance": 50 },
    { "tag": "jp-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "5m", "tolerance": 50 },
    { "tag": "us-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "5m", "tolerance": 50 },
    { "tag": "eu-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "5m", "tolerance": 50 },
    { "tag": "all-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "5m", "tolerance": 50 },

    { "tag": "cn", "type": "selector", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png", "outbounds": ["direct", "proxy"] },
    { "tag": "GLOBAL", "type": "selector", "outbounds": ["proxy", "sg", "jp", "us", "eu", "direct"] },
    { "tag": "direct", "type": "direct", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Direct.png" },
    { "tag": "dns-out", "type": "dns" }
  ],
  "inbounds": [
    {
      "type": "tun",
      "address": ["172.19.0.0/30", "fdfe:dcba:9876::0/126"],
      "stack": "mixed",
      "auto_route": true,
      "strict_route": true,
      "sniff": true,
      "sniff_override_destination": true,
      "mtu": 1400,
      "udp_timeout": 300
    }
  ],
  "experimental": {
    "clash_api": { "external_controller": "127.0.0.1:9090", "external_ui": "ui" },
    "cache_file": { "enabled": true, "store_fakeip": true }
  }
}