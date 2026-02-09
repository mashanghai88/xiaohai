{
  "log": { "level": "info", "timestamp": true },
  "dns": {
    "servers": [
      { "tag": "dns_proxy", "type": "https", "server": "8.8.8.8", "detour": "proxy" },
      { "tag": "dns_direct", "type": "https", "server": "223.5.5.5", "detour": "direct" },
      { "tag": "dns_resolver", "type": "udp", "server": "119.29.29.29", "detour": "direct" },
      { "tag": "dns_fakeip", "type": "fakeip", "inet4_range": "198.18.0.0/15", "inet6_range": "fc00::/18" }
    ],
    "rules": [
      { "outbound": "any", "server": "dns_resolver" },
      { "clash_mode": "Direct", "action": "route", "server": "dns_direct" },
      { "clash_mode": "Global", "action": "route", "server": "dns_fakeip" },
      { "rule_set": "ads_domain", "action": "reject" },
      { "rule_set": "cn_domain", "action": "route", "server": "dns_direct" },
      { "query_type": ["A", "AAAA"], "action": "route", "server": "dns_fakeip", "rewrite_ttl": 1 }
    ],
    "final": "dns_direct",
    "independent_cache": true,
    "reverse_mapping": true 
  },
  "route": {
    "rules": [
      { "action": "sniff", "sniffer": ["http", "tls", "quic", "dns"], "timeout": "500ms" },
      { "protocol": "dns", "action": "hijack-dns" },
      { "ip_is_private": true, "action": "route", "outbound": "direct" },
      { "clash_mode": "Global", "action": "route", "outbound": "GLOBAL" },
      { "clash_mode": "Direct", "action": "route", "outbound": "direct" },
      { "rule_set": "ads_domain", "action": "route", "outbound": "block" },
      { "rule_set": "openai_domain", "action": "route", "outbound": "openai" },
      { "rule_set": ["telegram_ip", "telegram_domain"], "action": "route", "outbound": "telegram" },
      { "rule_set": ["cn_ip", "cn_domain"], "action": "route", "outbound": "direct" }
    ],
    "rule_set": [
      { "tag": "ads_domain", "type": "remote", "format": "source", "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.json" },
      { "tag": "cn_ip", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geoip/cn.srs" },
      { "tag": "cn_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/cn.srs" },
      { "tag": "openai_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/openai.srs" },
      { "tag": "telegram_ip", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/telegram.srs" },
      { "tag": "telegram_domain", "type": "remote", "format": "binary", "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/telegram.srs" }
    ],
    "auto_detect_interface": true,
    "final": "proxy"
  },
  "outbounds": [
    { "tag": "openai", "type": "selector", "outbounds": ["proxy", "us-auto", "sg-auto", "jp-auto", "eu-auto", "direct"] },
    { "tag": "telegram", "type": "selector", "outbounds": ["proxy", "sg-auto", "jp-auto", "us-auto", "eu-auto", "direct"] },
    { "tag": "proxy", "type": "selector", "outbounds": ["all-auto", "sg-auto", "jp-auto", "us-auto", "eu-auto", "direct"] },
    
    // 模式参数：1m 频率 + 50ms 容差
    { "tag": "sg-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m", "tolerance": 50, "idle_timeout": "30m" },
    { "tag": "jp-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m", "tolerance": 50, "idle_timeout": "30m" },
    { "tag": "us-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m", "tolerance": 50, "idle_timeout": "30m" },
    { "tag": "eu-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m", "tolerance": 50, "idle_timeout": "30m" },
    { "tag": "all-auto", "type": "urltest", "outbounds": [], "url": "https://www.gstatic.com/generate_204", "interval": "1m", "tolerance": 50, "idle_timeout": "30m" },

    { "tag": "GLOBAL", "type": "selector", "outbounds": ["proxy", "all-auto", "direct"] },
    { "tag": "direct", "type": "direct" },
    { "tag": "block", "type": "block" },
    { "tag": "dns-out", "type": "dns" }
  ],
  "inbounds": [
    {
      "type": "tun",
      "address": ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
      "mtu": 1400,
      "auto_route": true,
      "strict_route": true,
      "sniff": true,
      "sniff_override_destination": true,
      "udp_timeout": 300
    },
    { "type": "mixed", "tag": "mixed-in", "listen": "::", "listen_port": 7890, "sniff": true }
  ],
  "experimental": {
    "clash_api": { "external_controller": "127.0.0.1:9090", "external_ui": "ui" },
    "cache_file": { "enabled": true, "store_fakeip": true, "path": "cache.db" }
  }
}