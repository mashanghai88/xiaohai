{
  "dns": {
    "servers": [
      {
        "tag": "google",
        "type": "https",
        "server": "8.8.8.8",
        "detour": "proxy"
      },
      {
        "tag": "ali",
        "type": "https",
        "server": "223.5.5.5"
      },
      {
        "tag": "fakeip",
        "type": "fakeip",
        "inet4_range": "198.18.0.0/15",
        "inet6_range": "fc00::/18"
      }
    ],
    "rules": [
      {
        "clash_mode": "Direct",
        "action": "route",
        "server": "ali"
      },
      {
        "clash_mode": "Global",
        "action": "route",
        "server": "fakeip"
      },
      {
        "query_type": "HTTPS",
        "action": "reject"
      },
      {
        "query_type": [
          "A",
          "AAAA"
        ],
        "action": "route",
        "server": "fakeip",
        "rewrite_ttl": 1
      },
      {
        "rule_set": "cn_domain",
        "action": "route",
        "server": "ali"
      }
    ],
    "final": "google",
    "independent_cache": true
  },
  "route": {
    "default_domain_resolver": {
      "server": "ali"
    },
    "rules": [
      {
        "action": "sniff",
        "sniffer": [
          "http",
          "tls",
          "quic",
          "dns"
        ],
        "timeout": "500ms"
      },
      {
        "type": "logical",
        "mode": "or",
        "rules": [
          {
            "port": 53
          },
          {
            "protocol": "dns"
          }
        ],
        "action": "hijack-dns"
      },
      {
        "ip_is_private": true,
        "action": "route",
        "outbound": "Direct"
      },
      {
        "clash_mode": "Global",
        "action": "route",
        "outbound": "GLOBAL"
      },
      {
        "clash_mode": "Direct",
        "action": "route",
        "outbound": "Direct"
      },
      {
        "rule_set": "bilibili_domain",
        "action": "route",
        "outbound": "BiliBili"
      },
      {
        "rule_set": "youtube_domain",
        "action": "route",
        "outbound": "Youtube"
      },
      {
        "rule_set": "openai_domain",
        "action": "route",
        "outbound": "Only-Ai"
      },
      {
        "type": "logical",
        "mode": "and",
        "rules": [
          {
            "rule_set": "proxy_domain"
          },
          {
            "invert": true,
            "rule_set": [
              "cn_domain",
              "google_domain",
              "telegram_domain"
            ]
          }
        ],
        "action": "route",
        "outbound": "PROXY"
      },
      {
        "action": "resolve"
      },
      {
        "rule_set": [
          "telegram_ip",
          "telegram_domain"
        ],
        "action": "route",
        "outbound": "Telegram"
      },
      {
        "rule_set": [
          "google_ip",
          "google_domain"
        ],
        "action": "route",
        "outbound": "Google"
      },
      {
        "rule_set": [
          "cn_ip",
          "cn_domain"
        ],
        "action": "route",
        "outbound": "CN"
      }
    ],
    "rule_set": [
      {
        "tag": "bilibili_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/bilibili.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "cn_ip",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geoip/cn.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "cn_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/cn.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "google_ip",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/google.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "google_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/google.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "openai_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/openai.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "proxy_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/geolocation-!cn.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "telegram_ip",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/telegram.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "telegram_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/telegram.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "youtube_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/youtube.srs",
        "download_detour": "Direct"
      }
    ],
    "final": "Final",
    "auto_detect_interface": true
  },
  "outbounds": [
    {
      "tag": "PROXY",
      "type": "selector",
      "outbounds": [
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "All-Auto"
    },
    {
      "tag": "Google",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "Telegram",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "BiliBili",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "Direct"
    },
    {
      "tag": "Youtube",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "Only-Ai",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "US-Auto"
    },
    {
      "tag": "CN",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "Direct"
    },
    {
      "tag": "Final",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "HK",
      "type": "selector",
      "outbounds": []
    },
    {
      "tag": "TW",
      "type": "selector",
      "outbounds": []
    },
    {
      "tag": "JP",
      "type": "selector",
      "outbounds": []
    },
    {
      "tag": "SG",
      "type": "selector",
      "outbounds": []
    },
    {
      "tag": "US",
      "type": "selector",
      "outbounds": []
    },
    {
      "tag": "All",
      "type": "selector",
      "outbounds": []
    },
    {
      "tag": "HK-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "TW-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "JP-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "SG-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "US-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "All-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "GLOBAL",
      "type": "selector",
      "outbounds": [
        "Direct",
        "PROXY",
        "HK",
        "HK-Auto",
        "TW",
        "TW-Auto",
        "JP",
        "JP-Auto",
        "SG",
        "SG-Auto",
        "US",
        "US-Auto",
        "All",
        "All-Auto"
      ],
      "default": "Direct"
    },
    {
      "tag": "Direct",
      "type": "direct"
    }
  ],
  "inbounds": [
    {
      "type": "tun",
      "address": [
        "172.19.0.0/30",
        "fdfe:dcba:9876::0/126"
      ],
      "stack": "mixed",
      "auto_route": true,
      "platform": {
        "http_proxy": {
          "enabled": true,
          "server": "127.0.0.1",
          "server_port": 7890
        }
      }
    },
    {
      "type": "mixed",
      "listen": "127.0.0.1",
      "listen_port": 7890
    }
  ],
  "experimental": {
    "clash_api": {
      "external_controller": "127.0.0.1:9090",
      "external_ui": "ui",
      "external_ui_download_url": "https://ghfast.top/https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip",
      "external_ui_download_detour": "direct"
    },
    "cache_file": {
      "enabled": true,
      "store_fakeip": true
    }
  },
  "log": {
    "disabled": false,
    "level": "info",
    "timestamp": true
  }
}